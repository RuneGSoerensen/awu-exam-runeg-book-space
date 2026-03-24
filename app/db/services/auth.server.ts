import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import { sessionStorage } from "./session.server";
import bcrypt from "bcryptjs";
import User from "../models/Users";

export const authenticator = new Authenticator<{ _id: string }>();

type SessionUser = {
  _id: string;
};

type UserData = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
};

async function verifyUser(email: string, password: string) {
  const user = await User.findOne({ email }).select("+passwordHash");
  if (!user) {
    throw new Error("No user found with this email.");
  }

  if (!user.passwordHash) {
    throw new Error(
      "This account was created using a social login provider. Please sign in with a provider instead.",
    );
  }

  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new Error("Invalid password.");
  }

  return user._id.toString();
}

authenticator.use(
  new FormStrategy(async ({ form }) => {
    // get the email and password from the form
    const email = form.get("email");
    const password = form.get("password");

    // Validate if the email is provided, is a string and is not only white spaces
    if (!email || typeof email !== "string" || !email.trim()) {
      throw new Error("Email is required and must be a string");
    }

    // Validate if the password is provided, is a string and is not only white spaces
    if (!password || typeof password !== "string" || !password.trim()) {
      throw new Error("Password is required and must be a string");
    }

    // verify the user
    const userId = await verifyUser(email, password);
    // Track login time
    // await updateLastLogin(userId);

    return { _id: userId };
  }),
  "form",
);

export async function getUser(
  request: Request,
): Promise<SessionUser | undefined> {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );
  return session.get("user");
}

export async function getUserData(request: Request): Promise<UserData | null> {
  const userFromSession = await getUser(request);

  if (!userFromSession || !userFromSession._id) {
    return null;
  }

  const user = await User.findById(userFromSession._id)
    .select("_id firstName lastName email")
    .lean<{
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    }>();

  if (!user) {
    return null;
  }

  return {
    _id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
}

export async function requireUser(request: Request) {
  const user = await getUserData(request);
  if (!user) {
    throw new Response("You must be signed in to view this page.", {
      status: 401,
      statusText: "Unauthorized",
    });
  }
  return user;
}
