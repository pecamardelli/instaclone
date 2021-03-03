import Home from "../pages/home/Home";
import User from "../pages/User";
import NotFound from "../pages/not-found/NotFound";
import BasicLayout from "../layouts/BasicLayout";

const routes = [
  {
    path: "/",
    layout: BasicLayout,
    component: Home,
    exact: true,
  },
  {
    path: "/:username",
    layout: BasicLayout,
    component: User,
    exact: true,
  },
  {
    layout: BasicLayout,
    component: NotFound,
  },
];

export default routes;
