import PageHeader from "../components/PageHeader";
export default function Mechanics() {
  return (
    <article className="article">
      <PageHeader
        kicker="02 / THE TRAP · PACKING + CRACKING"
        title={
          <>
            A quiet arithmetic
            <br />
            <em>of unequal power.</em>
          </>
        }
        intro="Modern partisan gerrymanders work by two complementary tricks. One concentrates opposing voters. The other makes them disappear into the margins."
      />
      <div className="mechanic-split">
        <div className="mechanic-card">
          <div className="diagram packing">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="eyebrow">THE FIRST MOVE</span>
          <h2>Pack</h2>
          <p>
            Jam as many opposing voters as possible into a small number of
            districts. They win — but by overwhelming margins. Every vote past
            50% + 1 is surplus.
          </p>
        </div>
        <div className="mechanic-card">
          <div className="diagram cracking">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <span className="eyebrow">THE SECOND MOVE</span>
          <h2>Crack</h2>
          <p>
            Split the remaining opposing voters across districts. They become a
            minority everywhere else, losing narrowly while the map-drawer wins
            widely.
          </p>
        </div>
      </div>
      <div className="prose narrow">
        <p>
          Together, packing and cracking create a wide gap between popular vote
          share and seat share: a party can win a large share of seats with only
          a modest share of the vote.
        </p>
        <div className="case-study">
          <span className="eyebrow">CASE STUDY / WISCONSIN ASSEMBLY</span>
          <strong>60 / 99</strong>
          <p>
            GOP seats after the 2011 map — with only 49% of the statewide vote.
          </p>
          <div className="bar">
            <b style={{ width: "61%" }} />
            <i style={{ width: "49%" }} />
          </div>
          <small>
            <b /> Seats &nbsp; <i /> Votes
          </small>
        </div>
      </div>
    </article>
  );
}
