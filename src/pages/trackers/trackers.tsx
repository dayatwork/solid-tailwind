import { PageTitle, TrackerList, TrackerTable } from "./components";
import { PinnedTracker } from "./components/PinnedTracker";

interface TrackersProps {
  // add props here
}

function Trackers(props: TrackersProps) {
  return (
    <>
      <PageTitle />
      <PinnedTracker />
      <TrackerList />
      <TrackerTable />
    </>
  );
}

export default Trackers;
