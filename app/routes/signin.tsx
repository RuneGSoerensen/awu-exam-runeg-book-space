import { data, Form, Link, redirect } from "react-router";
import { authenticator } from "../db/services/auth.server";
import { sessionStorage } from "../db/services/session.server";
import type { Route } from "./+types/signin";

export default function Signin({ actionData }: Route.ComponentProps) {
  return (
    <div className="mx-auto w-11/12 max-w-md pt-20">
      <h1 className="text-center text-2xl font-bold">Log in</h1>
      {/* Sign in form */}
      <Form method="post" className="flex flex-col space-y-4">
        <label className="block">
          Email
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full"
          />
        </label>
        <label className="block">
          Password
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full"
          />
        </label>

        {/* Show error message if there is one */}
        {actionData?.error ? (
          <div className="text-red-600">
            <p>{actionData?.error}</p>
          </div>
        ) : null}
        <div className="mt-4 w-full">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Log in
          </button>
        </div>
      </Form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export async function action({ request }: Route.ActionArgs) {
  try {
    const user = await authenticator.authenticate("form", request);

    if (!user) {
      return redirect("/signin");
    }

    const session = await sessionStorage.getSession(
      request.headers.get("cookie"),
    );
    session.set("user", user);
    return redirect("/?signedIn=true", {
      headers: { "Set-Cookie": await sessionStorage.commitSession(session) },
    });
  } catch (error) {
    if (error instanceof Error) {
      return data({ error: error.message });
    }
  }
}
