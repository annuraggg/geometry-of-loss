import PageHeader from "../components/PageHeader";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
const data = [
  { vote: 40, seats: 15 },
  { vote: 45, seats: 30 },
  { vote: 50, seats: 53 },
  { vote: 55, seats: 70 },
  { vote: 60, seats: 84 },
];
export default function Metrics() {
  return (
    <article className="article">
      <PageHeader
        kicker="03 / THE MEASURE · DETECTION"
        title={
          <>
            Can fairness
            <br />
            <em>be calculated?</em>
          </>
        }
        intro="Maps are arguments made of lines. Metrics give us a way to read those arguments: who is spending votes, who is winning seats, and whether the shape itself is a warning."
      />
      <div className="chart-panel">
        <div>
          <span className="eyebrow">SEAT–VOTE CURVE / HYPOTHETICAL MAP</span>
          <h2>A tilted curve reveals a tilted game.</h2>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: -20, bottom: 10 }}
          >
            <CartesianGrid stroke="#d8d4ca" vertical={false} />
            <XAxis
              dataKey="vote"
              tickFormatter={(v) => `${v}%`}
              stroke="#555"
            />
            <YAxis tickFormatter={(v) => `${v}%`} stroke="#555" />
            <Tooltip formatter={(v) => `${v}% seats`} />
            <Line
              type="monotone"
              dataKey="seats"
              stroke="#1B3B2B"
              strokeWidth={3}
              dot={{ fill: "#D59B36", r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="chart-note">
          At a 50–50 statewide tie, this map still produces 53% of seats for
          Party A: a 3-point partisan bias.
        </p>
      </div>
      <div className="metric-definitions">
        <div>
          <span>01</span>
          <h3>Efficiency gap</h3>
          <p>
            Count wasted votes — all votes for a losing candidate, plus votes
            beyond the winning threshold. The difference, divided by total
            votes, estimates the map’s structural advantage.
          </p>
          <code>EG = (Wasted B − Wasted A) / Total votes</code>
        </div>
        <div>
          <span>02</span>
          <h3>Polsby–Popper</h3>
          <p>
            Compare a district’s area to the area of a circle with the same
            perimeter. A round district scores 1; a convoluted boundary
            approaches 0.
          </p>
          <code>4π × Area / Perimeter²</code>
        </div>
        <div>
          <span>03</span>
          <h3>Reock + ensembles</h3>
          <p>
            Reock compares area to the smallest enclosing circle. MCMC ensembles
            go further: generate thousands of neutral maps and ask whether the
            enacted plan is an outlier.
          </p>
        </div>
      </div>
    </article>
  );
}
