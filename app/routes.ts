import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/shell-layout.tsx", [index("routes/home.tsx")]),
  route("signup", "routes/signup.tsx"),
  route("signin", "routes/signin.tsx"),
  route("logout", "routes/logout.tsx"),
] satisfies RouteConfig;
