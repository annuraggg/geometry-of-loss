import { useMemo, useState } from "react";
import {
  calculateMetrics,
  compactness,
  District,
  initialCells,
  initialDistricts,
  SIZE,
} from "../core/simulation";
import MetricCard from "./MetricCard";

const pct = (value: number) => `${Math.round(value * 100)}%`;

function EffectBar({
  label,
  partyA,
  partyB,
  description,
}: {
  label: string;
  partyA: number;
  partyB: number;
  description: string;
}) {
  return (
    <div className="effect-row">
      <div className="effect-heading">
        <span>{label}</span>
        <span>
          A {pct(partyA)} · B {pct(partyB)}
        </span>
      </div>
      <div className="effect-track">
        <i style={{ width: `${Math.min(100, partyA * 100)}%` }} />
        <b style={{ width: `${Math.min(100, partyB * 100)}%` }} />
      </div>
      <small>{description}</small>
    </div>
  );
}

export default function RedistrictingSandbox() {
  const [districts, setDistricts] = useState<District[]>(initialDistricts);
  const [selected, setSelected] = useState(0);
  const metrics = useMemo(
    () => calculateMetrics(districts, initialCells),
    [districts],
  );

  const assign = (cellId: number) =>
    setDistricts((current) =>
      current.map((district) => ({
        ...district,
        cells:
          district.id === selected
            ? [...new Set([...district.cells, cellId])]
            : district.cells.filter((id) => id !== cellId),
      })),
    );
  const reset = () => {
    setDistricts(initialDistricts);
    setSelected(0);
  };

  return (
    <section className="sandbox-wrap">
      <div className="sandbox-toolbar">
        <div>
          <span className="eyebrow">
            LIVE MAP / {districts.length} DISTRICTS
          </span>
          <h2>Draw the boundary.</h2>
        </div>
        <button className="button" onClick={reset}>
          Reset map ↺
        </button>
      </div>
      <div className="sandbox-grid">
        <div className="grid-area">
          <div
            className="grid"
            style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}
          >
            {initialCells.map((cell) => {
              const district =
                districts.find((d) => d.cells.includes(cell.id))?.id ?? -1;
              return (
                <button
                  aria-label={`Precinct ${cell.id + 1}, assign to district ${selected + 1}`}
                  key={cell.id}
                  onClick={() => assign(cell.id)}
                  className={`cell party-${cell.party.toLowerCase()} district-${district}`}
                >
                  <span>{cell.party}</span>
                </button>
              );
            })}
          </div>
          <div className="legend">
            <span>
              <i className="swatch swatch-a" /> PARTY A
            </span>
            <span>
              <i className="swatch swatch-b" /> PARTY B
            </span>
            <span className="legend-tip">
              Select a district, then click precincts to paint its boundary.
            </span>
          </div>
        </div>
        <div className="sandbox-side">
          <div className="district-picker">
            <span className="ui-label">SELECT DISTRICT</span>
            {districts.map((district) => (
              <button
                key={district.id}
                className={selected === district.id ? "selected" : ""}
                onClick={() => setSelected(district.id)}
              >
                <i style={{ background: `var(--d${district.id})` }} />
                {String(district.id + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <div className="metric-stack">
            <MetricCard
              label="Popular vote / A"
              value={pct(metrics.popularA)}
              note={`${metrics.popular.A} of ${initialCells.length} precinct votes`}
              accent="amber"
            />
            <MetricCard
              label="Seats won / A"
              value={pct(metrics.seatsA)}
              note={`${metrics.seats.A} of ${districts.length} districts`}
              accent="green"
            />
            <MetricCard
              label="Efficiency gap"
              value={`${metrics.efficiencyGap >= 0 ? "+" : ""}${Math.round(metrics.efficiencyGap * 100)}%`}
              note="positive favors Party A"
            />
          </div>
          <div className="effects-panel">
            <span className="ui-label">DISTORTION READOUT</span>
            <EffectBar
              label="PACKING / surplus wins"
              partyA={metrics.packing.A}
              partyB={metrics.packing.B}
              description="High values mean a party is winning districts by votes it did not need."
            />
            <EffectBar
              label="CRACKING / narrow losses"
              partyA={metrics.cracking.A}
              partyB={metrics.cracking.B}
              description="High values mean a party is losing districts despite getting close to a majority."
            />
            <div className="wasted-line">
              <span>WASTED VOTES</span>
              <strong>A {metrics.wasted.A}</strong>
              <strong>B {metrics.wasted.B}</strong>
            </div>
          </div>
          <div className="compactness">
            <span className="ui-label">SHAPE CHECK / POLSBY–POPPER</span>
            {metrics.stats.map((stat) => (
              <div className="compact-row" key={stat.id}>
                <span>District {stat.id + 1}</span>
                <div>
                  <b style={{ width: `${compactness(stat) * 100}%` }} />
                </div>
                <em>{Math.round(compactness(stat) * 100)}%</em>
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="sandbox-caption">
        <b>THE RULE:</b> Each cell is one precinct and one vote. A district wins
        with a simple majority. Change the geometry; the electorate stays fixed.
      </p>
    </section>
  );
}
