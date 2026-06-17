'use client';

import { Fragment, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavItems from './config';

interface NavItem {
    label: string;
    icon: any;
    path: string;
    position?: 'top' | 'bottom';
}

export default function Sidebar() {
    const pathname = usePathname();
    const navItems = NavItems();

    return (
        <div className='w-50 shrink-0 h-full bg-white border-r border-gray-200'>
            <aside className='flex h-full flex-col w-full overflow-y-auto'>
                <div className='flex-1'>
                    <div className='flex flex-col space-y-1'>
                        {navItems.map((item, index) => {
                            if (item.position === 'top' || !item.position) {
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

                <div className='sticky bottom-0 mt-auto mb-4'>
                    {navItems.map((item, index) => {
                        if (item.position === 'bottom') {
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
            </aside>
        </div>
    );
}

export const SideNavItem: React.FC<{
    label: string;
    icon: React.ReactNode;
    path: string;
    active: boolean;
}> = ({ label, icon, path, active }) => {
    return (
        <Link
            href={path}
            className={`flex items-center transition-colors duration-200 ${
                path === '/logout'
                ? 'text-(--danger) hover:bg-red-50'
                : active
                    ? 'bg-(--green-50) text-(--green-500) border-l-4 border-l-(--green-500)'
                    : 'text-(--gray-2) hover:bg-gray-100 hover:text-(--green-500)'
            }`}
        >
            <div className='flex items-center gap-1.5 text-sm py-2.5 px-3 w-full m-0'>
                <span className="w-5 h-5 shrink-0">
                    {icon}
                </span>
                <span className="font-bold">{label}</span>
            </div>
        </Link>
    );
};