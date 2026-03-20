import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Welcome to React Router!</h1>
      <p className="text-lg text-gray-600">
        This is the home page of your new React Router app.
      </p>
    </div>
  );
}
