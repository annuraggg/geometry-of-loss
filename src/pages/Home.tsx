import PageHeader from "../components/PageHeader";
import MetricCard from "../components/MetricCard";
export default function Home() {
  return (
    <article className="article">
      <PageHeader
        kicker="01 / THE ORIGIN · MASSACHUSETTS, 1812"
        title={
          <>
            The map is not
            <br />
            <em>the territory.</em>
          </>
        }
        intro="A district is a promise: that a group of neighbors can turn a shared preference into representation. But the lines around that group can quietly rewrite the promise."
      />
      <div className="hero-graphic">
        <div className="salamander">
          <span className="eye" />
          <span className="leg one" />
          <span className="leg two" />
          <span className="tail" />
        </div>
        <span className="graphic-label">ESSEX COUNTY / 1812</span>
      </div>
      <div className="prose-grid">
        <div>
          <span className="eyebrow">A creature enters the lexicon</span>
          <h2>It started with a salamander.</h2>
        </div>
        <div className="prose">
          <p>
            In 1812, Massachusetts Governor Elbridge Gerry approved a
            redistricting plan to entrench his party’s power. One new Essex
            County district was so oddly shaped that a Boston newspaper
            cartoonist, Elkanah Tisdale, portrayed it as a salamander.
          </p>
          <p>
            The portmanteau “Gerry-mander” appeared in print in the{" "}
            <i>Boston Gazette</i> on March 26. Gerry lost his own re-election.
            His party retained control of the legislature.
          </p>
          <p className="pullquote">
            The district did not need to look fair. It only needed to count.
          </p>
        </div>
      </div>
      <div className="stats-row">
        <MetricCard
          label="FIRST APPEARANCE"
          value="1812"
          note="Boston Gazette"
        />
        <MetricCard
          label="THE CREATURE"
          value="Essex"
          note="A district shaped like a salamander"
        />
        <MetricCard
          label="THE PARADOX"
          value="Gerry lost"
          note="His party kept the majority"
        />
      </div>
    </article>
  );
}
