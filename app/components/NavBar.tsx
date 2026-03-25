import {
  House,
  MessageCircle,
  ChartNoAxesColumnIcon,
  LogOut,
} from "lucide-react";
import { NavLink, Form } from "react-router";

export default function NavBar() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 z-20 w-full max-w-[430px] -translate-x-1/2 bg-white p-5"
      aria-label="Primary Navigation"
    >
      <ul className="flex h-full items-center justify-between">
        <li>
          <NavItem to="/" icon={House} />
        </li>
        <li>
          <NavItem to="/chats" icon={MessageCircle} />
        </li>
        <li>
          <NavItem to="/stats" icon={ChartNoAxesColumnIcon} />
        </li>
        <li>
          <Form method="post" action="/logout" className="h-full">
            <button
              type="submit"
              className="flex h-full w-full items-center justify-center text-sm font-medium text-slate-600"
            >
              <LogOut size={25} />
            </button>
          </Form>
        </li>
      </ul>
    </nav>
  );
}

function NavItem({
  to,
  icon: Icon,
  end = false,
}: {
  to: string;
  icon: React.ComponentType<{ size?: number }>;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex h-full items-center justify-center ${
          isActive ? "text-black" : "text-slate-800"
        }`
      }
    >
      {({ isActive }) => (
        <Icon size={25} fill={isActive ? "currentColor" : "none"} />
      )}
    </NavLink>
  );
}
