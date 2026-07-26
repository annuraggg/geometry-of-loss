import { NavLink, Outlet } from "react-router-dom";

const links = [
  ["/", "01 / The origin"],
  ["/packing-and-cracking", "02 / The trap"],
  ["/metrics", "03 / The measure"],
  ["/reform", "04 / The way out"],
  ["/citations", "05 / Sources"],
];

export default function Layout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#chapter">
        Skip to chapter
      </a>
      <aside className="sidebar">
        <div className="brand">
          <span className="eyebrow">An explorable explanation</span>
          <div className="brand-title">
            GEOMETRY
            <br />
            <i>OF</i> LOSS
          </div>
        </div>
        <div className="nav-group">
          <nav>
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
        <NavLink className="sandbox-link" to="/redistricting-sandbox">
          <span>LIVE TOOL</span>
          <strong>04 / Draw the map →</strong>
        </NavLink>
        <div className="sidebar-foot">
          <span>POLITICAL GEOMETRY</span>
        </div>
      </aside>
      <main id="chapter" className="main">
        <Outlet />
      </main>
    </div>
  );
}
