import { redirect } from "react-router";
import type { Route } from "../+types/root";
import { sessionStorage } from "../db/services/session.server";

export async function action({ request }: Route.ActionArgs) {
  const session = await sessionStorage.getSession(
    request.headers.get("cookie"),
  );

  return redirect("/", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}
