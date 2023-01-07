import { PageTitle, TaskList, TaskTable, PinnedTask } from "../components";

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
