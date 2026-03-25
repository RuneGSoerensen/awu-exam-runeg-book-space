import { data, Form, Link, redirect } from "react-router";
import Users from "~/db/models/Users";
import type { Route } from "./+types/signup";
import bcrypt from "bcryptjs";
// import {
//   validatePassword,
//   validateRecruiterFields,
//   validateRequiredFields,
// } from "~/utils/validators/signupValidators";

export default function Signup({ actionData }: Route.ComponentProps) {
  return (
    <main className="mx-auto w-11/12 max-w-md pt-20">
      <h1 className="text-2xl font-bold">
        Welcome, <br /> sign up to continue
      </h1>

      {/* User form */}
      <Form method="post" className="flex flex-col space-y-4">
        <label htmlFor="firstName" className="block text-sm mt-4">
          First name
          <input
            type="text"
            name="firstName"
            placeholder="Type your first name here..."
            className="w-full border border-gray-800 rounded-lg px-3 py-3 mt-1"
          />
        </label>

        <label htmlFor="lastName" className="block text-sm">
          Last name
          <input
            type="text"
            name="lastName"
            placeholder="Type your last name here..."
            className="w-full border border-gray-800 rounded-lg px-3 py-3 mt-1"
          />
        </label>

        <label htmlFor="email" className="block text-sm">
          Email
          <input
            type="email"
            name="email"
            placeholder="Type your email here..."
            className="w-full border border-gray-800 rounded-lg px-3 py-3 mt-1"
          />
        </label>

        <label htmlFor="password" className="block text-sm">
          Password
          <input
            type="password"
            name="password"
            placeholder="Type your password here..."
            className="w-full border border-gray-800 rounded-lg px-3 py-3 mt-1"
          />
        </label>

        <label htmlFor="confirmPassword" className="block text-sm">
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password here..."
            className="w-full border border-gray-800 rounded-lg px-3 py-3 mt-1"
          />
        </label>

        {/* Show error message if there is one */}
        {actionData?.error ? (
          <div className="text-red-600">
            <p>{actionData.error}</p>
          </div>
        ) : null}

        <div className="mt-4 w-full">
          <button
            type="submit"
            className="w-full bg-yellow-950 text-sm text-white py-3.5 px-4 rounded-lg"
          >
            Sign up
          </button>
        </div>
      </Form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link to="/signin" className="text-blue-600">
          Sign in
        </Link>
      </p>
    </main>
  );
}

// Handle form submission
export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);

    // Check for common errors for both roles
    // validateRequiredFields(userData);

    // Password validation
    // validatePassword(userData);

    // Recruiter specific errors
    // validateRecruiterFields(userData);

    // check if user already exists
    const existingUser = await Users.findOne({ email: userData.email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Create the user
    await Users.create({
      email: userData.email.toString(),
      passwordHash: await bcrypt.hash(userData.password.toString(), 10),
      firstName: userData.firstName.toString(),
      lastName: userData.lastName.toString(),
    });

    // Redirect to sign in page
    return redirect("/signin");
  } catch (error) {
    // return other errors
    if (error instanceof Error) {
      return data({ error: error.message });
    }
  }
}
