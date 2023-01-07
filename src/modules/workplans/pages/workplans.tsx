import {
  PageTitle,
  WorkplanList,
  WorkplanTable,
  PinnedWorkplan,
} from "../components";

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
