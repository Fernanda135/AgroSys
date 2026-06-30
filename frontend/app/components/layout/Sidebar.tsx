"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import NavItems from "./config";
import LogoutModal from "../logout/logoutModal";
import { authService } from "@/app/services/authService";

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const navItems = NavItems();

    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    function handleLogout() {
        authService.logout();
        setOpenLogoutModal(false);
        router.push("/login");
    }

    return (
        <div className="w-50 shrink-0 h-full bg-white border-r border-gray-200">
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
                                    onClick={() => setOpenLogoutModal(true)}
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

            <LogoutModal
                isOpen={openLogoutModal}
                onClose={() => setOpenLogoutModal(false)}
                onConfirm={handleLogout}
            />
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
    const className = `flex items-center w-full transition-colors duration-200 cursor-pointer ${label === "Sair"
            ? "text-(--danger) hover:bg-red-50"
            : active
                ? "bg-(--green-50) text-(--green-500) border-l-4 border-l-(--green-500)"
                : "text-(--gray-2) hover:bg-gray-100 hover:text-(--green-500)"
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