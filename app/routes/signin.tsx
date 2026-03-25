import { data, Form, Link, redirect } from "react-router";
import { authenticator } from "../db/services/auth.server";
import { sessionStorage } from "../db/services/session.server";
import type { Route } from "./+types/signin";

export default function Signin({ actionData }: Route.ComponentProps) {
  return (
    <div className="mx-auto w-11/12 max-w-md pt-20">
      <h1 className="text-2xl font-bold">
        Welcome, <br></br> sign in to continue
      </h1>
      {/* Sign in form */}
      <Form method="post" className="flex flex-col space-y-4">
        <label className="block text-sm mt-4">
          Email
          <input
            type="email"
            name="email"
            className="w-full border border-gray-800 rounded-lg px-3 py-3 mt-1"
          />
        </label>
        <label className="block text-sm">
          Password
          <input
            type="password"
            name="password"
            className="w-full border border-gray-800 rounded-lg px-3 py-3 mt-1"
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
            className="w-full bg-yellow-950 text-sm text-white py-3.5 px-4 rounded-lg"
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
