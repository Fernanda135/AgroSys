"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import NavItems from "./config";
import { authService } from "@/app/services/auth.service";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = NavItems();


  function handleLogout() {
    const confirmed = window.confirm("Tem certeza que deseja sair?");

    if (!confirmed) return;

    authService.logout();
    router.push("/login");
  }

  return (
    <div className="shrink-0 h-full w-[200] bg-white border-r border-(--gray)">
      <aside className="flex h-full flex-col w-full overflow-y-auto">
        <div className="flex-1">
          <div className="flex flex-col space-y-1">
            {navItems.map((item, index) => {
              if (item.position === "top" || !item.position) {
                return (
                  <SideNavItem
                    key={index}
                    label={item.label}
                    icon={item.icon}
                    path={item.path}
                    active={pathname === item.path}
                  />
                );
              }

              return null;
            })}
          </div>
        </div>

        <div className="sticky bottom-0 mt-auto mb-4">
          {navItems.map((item, index) => {
            if (item.position !== "bottom") return null;

            if (item.label === "Sair") {
              return (
                <SideNavItem
                  key={index}
                  label={item.label}
                  icon={item.icon}
                  onClick={handleLogout}
                />
              );
            }

            return (
              <SideNavItem
                key={index}
                label={item.label}
                icon={item.icon}
                path={item.path}
                active={pathname === item.path}
              />
            );
          })}
        </div>
      </aside>

    </div>
  );
}

export const SideNavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  path?: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ label, icon, path, active, onClick }) => {
  const className = `flex items-center w-full transition-colors duration-200 cursor-pointer ${
    label === "Sair"
      ? "text-(--danger) hover:text-red-800"
      : active
        ? "bg-(--green-50) text-(--green-500) border-l-4 border-(--green-500) transition-colors duration-400"
        : "text-(--gray-2) hover:text-(--green-500)"
  }`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        <div className="flex items-center gap-1.5 text-sm py-2.5 px-3 w-full">
          <span className="w-5 h-5 shrink-0">{icon}</span>
          <span className="font-bold">{label}</span>
        </div>
      </button>
    );
  }

  return (
    <Link href={path!} className={className}>
      <div className="flex items-center gap-1.5 text-sm py-2.5 px-3 w-full">
        <span className="w-5 h-5 shrink-0">{icon}</span>
        <span className="font-bold">{label}</span>
      </div>
    </Link>
  );
};
