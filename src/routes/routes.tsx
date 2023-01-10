import { RouteDefinition } from "@solidjs/router";

import { Protected } from "./protected";
import { Unprotected } from "./unprotected";

import Signin from "../modules/auth/pages/signin";
import Signup from "../modules/auth/pages/signup";
import Home from "../modules/home/pages/home";
import ProjectDetail from "../modules/projects/pages/project-detail";
import Projects from "../modules/projects/pages/projects";
import Tasks from "../modules/tasks/pages/tasks";
import Trackers from "../modules/trackers/pages/trackers";
import Users from "../modules/users/pages/users";
import Workplans from "../modules/workplans/pages/workplans";
import NotFound from "./404";
import WorkplanDetail from "../modules/workplans/pages/workplan-detail";
import TaskDetail from "../modules/tasks/pages/task-detail";

export const routes: RouteDefinition[] = [
  {
    path: "",
    component: Protected,
    children: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/projects",
        component: Projects,
      },
      {
        path: "/projects/:id",
        component: ProjectDetail,
      },
      {
        path: "/workplans",
        component: Workplans,
      },
      {
        path: "/workplans/:id",
        component: WorkplanDetail,
      },
      {
        path: "/tasks",
        component: Tasks,
      },
      {
        path: "/tasks/:id",
        component: TaskDetail,
      },
      {
        path: "/trackers",
        component: Trackers,
      },
      {
        path: "/users",
        component: Users,
      },
    ],
  },
  {
    path: "",
    component: Unprotected,
    children: [
      {
        path: "/signin",
        component: Signin,
      },
      {
        path: "/signup",
        component: Signup,
      },
    ],
  },
  {
    path: "*",
    component: NotFound,
  },
];
