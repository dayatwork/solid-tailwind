import { PageTitle, TaskList, TaskTable } from "./components";
import { PinnedTask } from "./components/PinnedTask";

interface TasksProps {
  // add props here
}

function Tasks(props: TasksProps) {
  return (
    <>
      <PageTitle />
      <PinnedTask />
      <TaskList />
      <TaskTable />
    </>
  );
}

export default Tasks;
