import PageHeader from "../components/PageHeader";

export default function Reform() {
  return (
    <article className="article">
      <PageHeader
        kicker="05 / THE WAY OUT · REFORM"
        title={
          <>
            Who gets to
            <br />
            <em>draw the lines?</em>
          </>
        }
        intro="If the map is a machine for translating votes into power, reform asks who should be allowed to set its gears."
      />
      <div className="reform-list">
        <section>
          <span className="big-number">01</span>
          <div>
            <h2>Independent commissions</h2>
            <p>
              California voters created a Citizens Redistricting Commission
              through Propositions 11 and 20. Similar citizen commissions now
              operate in Arizona, Colorado, Michigan, Missouri and Utah.
            </p>
            <p>
              Their criteria — equal population, compactness, respect for
              communities and public hearings — make the process legible to the
              people it governs.
            </p>
          </div>
        </section>
        <section>
          <span className="big-number">02</span>
          <div>
            <h2>Ensembles, not a single answer</h2>
            <p>
              Markov Chain Monte Carlo methods treat redistricting as a
              graph-partitioning problem. Generate many valid maps, then compare
              the enacted plan’s partisan outcomes to the neutral distribution.
            </p>
            <p>
              If the real map is an outlier, its geometry is evidence. The
              typical electoral behavior of a large ensemble becomes a baseline
              for judging the exceptional.
            </p>
          </div>
        </section>
      </div>
      <div className="pullquote wide">
        The goal is not a perfect map. It is a process that can explain itself.
      </div>
    </article>
  );
}
