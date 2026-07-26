import PageHeader from "../components/PageHeader";
import RedistrictingSandbox from "../components/RedistrictingSandbox";
export default function SandboxPage() {
  return (
    <article className="article">
      <PageHeader
        kicker="04 / THE SANDBOX · LIVE SIMULATION"
        title={
          <>
            Move one block.
            <br />
            <em>Change the story.</em>
          </>
        }
        intro="The electorate below is fixed. The lines are not. Select a district, then click precincts to assign them. Watch the popular vote stay still while the seat share moves."
      />
      <RedistrictingSandbox />
    </article>
  );
}
