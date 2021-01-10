import Home from "../pages/home";
import User from "../pages/User";
import NotFound from "../pages/not-found";

const routes = [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/user",
    component: User,
    exact: true,
  },
  {
    component: NotFound,
  },
];

export default routes;
