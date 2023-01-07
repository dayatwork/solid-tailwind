import {
  PageTitle,
  TrackerList,
  TrackerTable,
  PinnedTracker,
} from "../components";

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
