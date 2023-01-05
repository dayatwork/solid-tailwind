import { PageTitle, WorkplanList, WorkplanTable } from "./components";
import { PinnedWorkplan } from "./components/PinnedWorkplan";

interface WorkplansProps {
  // add props here
}

function Workplans(props: WorkplansProps) {
  return (
    <>
      <PageTitle />
      <PinnedWorkplan />
      <WorkplanList />
      <WorkplanTable />
    </>
  );
}

export default Workplans;
