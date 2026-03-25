import { Outlet, redirect, type LoaderFunctionArgs } from "react-router";
import { getUserData } from "~/db/services/auth.server";
import NavBar from "~/components/NavBar";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await getUserData(request);

  if (!user) {
    const url = new URL(request.url);
    const redirectTo = `${url.pathname}${url.search}`;
    return redirect(`/signin?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return { user };
}

export default function ShellLayout() {
  return (
    <main className="min-h-dvh bg-slate-100">
      <div className="mx-auto min-h-dvh w-full max-w-[430px] bg-white shadow-sm">
        <div className="px-4 pt-4 pb-24">
          <Outlet />
        </div>
        <NavBar />
      </div>
    </main>
  );
}
