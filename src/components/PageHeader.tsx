import type { ReactNode } from "react";
export default function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: ReactNode;
  intro: string;
}) {
  return (
    <header className="page-header">
      <span className="eyebrow">{kicker}</span>
      <h1>{title}</h1>
      <p className="dek">{intro}</p>
    </header>
  );
}
