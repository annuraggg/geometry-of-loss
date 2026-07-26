export type Party = "A" | "B";
export type Winner = Party | "T";
export type Cell = { id: number; row: number; col: number; party: Party };
export type District = { id: number; cells: number[] };

export type DistrictStats = District & {
  a: number;
  b: number;
  total: number;
  winner: Winner;
  margin: number;
  shareA: number;
  shareB: number;
  wastedA: number;
  wastedB: number;
};

export type PartyMetrics = { A: number; B: number; T: number };

export type SimulationMetrics = {
  stats: DistrictStats[];
  popular: PartyMetrics;
  seats: PartyMetrics;
  popularA: number;
  seatsA: number;
  efficiencyGap: number;
  wasted: { A: number; B: number };
  packing: { A: number; B: number };
  cracking: { A: number; B: number };
};

export const SIZE = 8;

export const initialCells: Cell[] = Array.from(
  { length: SIZE * SIZE },
  (_, id) => {
    const row = Math.floor(id / SIZE);
    const col = id % SIZE;
    const party: Party =
      col < 3 || (row >= 5 && col < 6) || (row === 3 && col === 3) ? "A" : "B";
    return { id, row, col, party };
  },
);

export const initialDistricts: District[] = Array.from(
  { length: 4 },
  (_, id) => ({
    id,
    cells: initialCells
      .filter(
        (cell) =>
          Math.floor(cell.row / 4) * 2 + Math.floor(cell.col / 4) === id,
      )
      .map((cell) => cell.id),
  }),
);

const thresholdFor = (total: number) => Math.floor(total / 2) + 1;

/** Returns a stable, de-duplicated assignment so metrics never double-count a precinct. */
export function normalizeDistricts(
  districts: District[],
  cells: Cell[],
): District[] {
  const validIds = new Set(cells.map((cell) => cell.id));
  const used = new Set<number>();
  return districts.map((district) => ({
    ...district,
    cells: district.cells
      .filter((id) => validIds.has(id) && !used.has(id))
      .filter((id) => {
        used.add(id);
        return true;
      }),
  }));
}

export function districtStats(
  districts: District[],
  cells: Cell[],
): DistrictStats[] {
  const byId = new Map(cells.map((cell) => [cell.id, cell]));
  return normalizeDistricts(districts, cells).map((district) => {
    const members = district.cells
      .map((id) => byId.get(id))
      .filter((cell): cell is Cell => Boolean(cell));
    const a = members.filter((cell) => cell.party === "A").length;
    const b = members.length - a;
    const total = members.length;
    const winner: Winner = a === b ? "T" : a > b ? "A" : "B";
    const threshold = thresholdFor(total);
    const wastedA = winner === "A" ? Math.max(0, a - threshold) : a;
    const wastedB = winner === "B" ? Math.max(0, b - threshold) : b;
    return {
      ...district,
      a,
      b,
      total,
      winner,
      margin: total ? Math.abs(a - b) / total : 0,
      shareA: total ? a / total : 0,
      shareB: total ? b / total : 0,
      wastedA,
      wastedB,
    };
  });
}

const average = (values: number[]) =>
  values.length
    ? values.reduce((sum, value) => sum + value, 0) / values.length
    : 0;

/**
 * Calculates statewide vote/seat shares and a signed efficiency gap.
 * Positive EG means Party A has fewer wasted votes and a structural advantage.
 * Packing is surplus vote share in wins; cracking is the narrow-loss share.
 */
export function calculateMetrics(
  districts: District[],
  cells: Cell[],
): SimulationMetrics {
  const stats = districtStats(districts, cells);
  const totalVotes = cells.length;
  const votesA = cells.filter((cell) => cell.party === "A").length;
  const votesB = totalVotes - votesA;
  const seats: PartyMetrics = {
    A: stats.filter((district) => district.winner === "A").length,
    B: stats.filter((district) => district.winner === "B").length,
    T: stats.filter((district) => district.winner === "T").length,
  };
  const denominator = Math.max(1, stats.length);
  const wastedA = stats.reduce((sum, district) => sum + district.wastedA, 0);
  const wastedB = stats.reduce((sum, district) => sum + district.wastedB, 0);

  return {
    stats,
    popular: { A: votesA, B: votesB, T: 0 },
    seats,
    popularA: totalVotes ? votesA / totalVotes : 0,
    seatsA: seats.A / denominator,
    efficiencyGap: totalVotes ? (wastedB - wastedA) / totalVotes : 0,
    wasted: { A: wastedA, B: wastedB },
    packing: {
      A: average(
        stats
          .filter((d) => d.winner === "A")
          .map((d) => Math.max(0, d.shareA - 0.5)),
      ),
      B: average(
        stats
          .filter((d) => d.winner === "B")
          .map((d) => Math.max(0, d.shareB - 0.5)),
      ),
    },
    cracking: {
      A: average(
        stats
          .filter((d) => d.winner === "B")
          .map((d) => Math.max(0, 0.5 - d.shareA)),
      ),
      B: average(
        stats
          .filter((d) => d.winner === "A")
          .map((d) => Math.max(0, 0.5 - d.shareB)),
      ),
    },
  };
}

export function compactness(district: District): number {
  if (!district.cells.length) return 0;
  const members = new Set(district.cells);
  const perimeter = district.cells.reduce((sum, id) => {
    const x = id % SIZE;
    const y = Math.floor(id / SIZE);
    return (
      sum +
      [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ].filter(([dx, dy]) => !members.has((y + dy) * SIZE + x + dx)).length
    );
  }, 0);
  return Math.min(
    1,
    (4 * Math.PI * district.cells.length) / Math.max(1, perimeter * perimeter),
  );
}
