import PageHeader from "../components/PageHeader";

const refs = [
  [
    "Academic papers",
    "Stephanopoulos, N. & McGhee, E. (2015), “Partisan Gerrymandering and the Efficiency Gap,” 82 U. Chicago L. Rev. 831.",
    "Fifield, B. et al. (2020), “Automated Redistricting Simulation Using Markov Chain Monte Carlo,” Journal of Computational and Graphical Statistics 29(4): 715–728.",
    "McGhee, E. (2020), “Partisan Gerrymandering and Political Science,” Electoral Studies.",
    "Kenny, C. et al. (2023), “Widespread Partisan Gerrymandering Mostly Cancels Nationally, but Reduces Electoral Competition,” PNAS 120(25).",
  ],
  [
    "Supreme Court cases",
    "Baker v. Carr, 369 U.S. 186 (1962) — apportionment claims are justiciable.",
    "Davis v. Bandemer, 478 U.S. 109 (1986) — partisan gerrymandering claims recognized, without a controlling test.",
    "Vieth v. Jubelirer, 541 U.S. 267 (2004) — no majority standard for adjudication.",
    "Gill v. Whitford, 585 U.S. ___ (2018) — Wisconsin challenge focused on standing.",
    "Rucho v. Common Cause, 588 U.S. ___ (2019) — federal courts cannot adjudicate partisan gerrymandering claims.",
  ],
  [
    "Reports, methods + data journalism",
    "Brennan Center for Justice, “Gerrymandering Explained” and “How Gerrymandering Tilts the 2024 Race for the House.”",
    "Public Policy Institute of California, McGhee, “Assessing California’s Redistricting Commission” (2018).",
    "Campaign Legal Center, “Independent Redistricting Commissions.”",
    "Mattingly et al., “Ensembles and Outliers,” Duke University Quantifying Gerrymandering project (2018).",
    "Elkanah Tisdale, “The Gerry-Mander,” Boston Gazette, March 26, 1812.",
  ],
];

export default function Citations() {
  return (
    <article className="article">
      <PageHeader
        kicker="05 / SOURCES · PRIMARY REFERENCES"
        title={
          <>
            Follow the
            <br />
            <em>evidence.</em>
          </>
        }
        intro="This explorable is built from the thesis source material and the scholarship that made political geometry measurable."
      />
      <div className="references">
        {refs.map(([title, ...items]) => (
          <section key={title}>
            <h2>{title}</h2>
            {items.map((item, i) => (
              <p key={i}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {item}
              </p>
            ))}
          </section>
        ))}
      </div>
      <footer className="source-note">
        A note on the sandbox: its precincts are synthetic, designed to make the
        mechanics visible rather than model a real state.
      </footer>
    </article>
  );
}
