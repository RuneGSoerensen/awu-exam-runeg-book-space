import { data, Form, Link } from "react-router";
import Users from "~/db/models/Users";
import { redirect } from "react-router";
import type { Route } from "../+types/root";
import bcrypt from "bcryptjs";
// import {
//   validatePassword,
//   validateRecruiterFields,
//   validateRequiredFields,
// } from "~/utils/validators/signupValidators";

export default function Signup({ actionData }: Route.ComponentProps) {
  return (
    <main className="flex flex-col items-center pt-4">
      <h1 className="mb-6 text-2xl font-bold">Sign up</h1>

      {/* User form */}
      <div className="mx-auto w-11/12 max-w-md">
        <h2 className="mb-2 text-center text-lg font-semibold">
          Create an account
        </h2>
        <div className="flex flex-col space-y-4">
          <Form method="post" className="flex flex-col space-y-4">
            <label htmlFor="firstName">
              First name
              <input
                type="text"
                name="firstName"
                placeholder="Type your first name here..."
                className="w-full"
              />
            </label>
            <label htmlFor="lastName">
              Last name
              <input
                type="text"
                name="lastName"
                placeholder="Type your last name here..."
                className="w-full"
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                name="email"
                placeholder="Type your email here..."
                className="w-full"
              />
            </label>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="Type your password here..."
                className="w-full"
              />
            </label>
            <label htmlFor="confirmPassword">
              Confirm password
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password here..."
                className="w-full"
              />
            </label>
            <div className="flex items-center justify-between">
              <button type="submit" className="self-start">
                Sign up
              </button>
              <p>
                Already have an account?{" "}
                <Link to="/signin" className="text-blue">
                  Sign in
                </Link>
              </p>
            </div>
            {/* Show error message if there is one */}
            {/* {actionData?.error ? (
                <div className="text-red-600">
                  <p>{actionData?.error}</p>
                </div>
              ) : null} */}
          </Form>
        </div>
      </div>
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
    const newUser = await Users.create({
      email: userData.email.toString(),
      passwordHash: await bcrypt.hash(userData.password.toString(), 10),
      firstName: userData.firstName.toString(),
      lastName: userData.lastName.toString(),
    });

    // Create the candidate or recruiter document
    // if (userData.role === "candidate") {
    //   await Candidate.create({
    // userId: newUser._id,
    //   });
    // }

    // Redirect to sign in page
    return redirect("/signin");
  } catch (error) {
    // return other errors
    if (error instanceof Error) {
      return data({ error: error.message });
    }
  }
}
