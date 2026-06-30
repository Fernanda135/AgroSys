import React from 'react'

import { 
    LayoutDashboard, 
    ClipboardList, 
    Sprout, 
    Warehouse, 
    Banknote, 
    Cloudy, 
    CircleUserRound, 
    LogOut 
} from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function NavItems() {

    const pathname = usePathname();

    function isNavItemActive(pathname: string, nav: string) {
        return pathname.includes(nav);
    };

    return [
        {
            label: 'Dashboard',
            path: '/dashboard',
            icon: <LayoutDashboard size={20} />,
            active: isNavItemActive(pathname, '/dashboard'),
            position: 'top'
        },
        {
            label: 'Tarefas',
            path: '/todo',
            icon: <ClipboardList size={20} />,
            active: isNavItemActive(pathname, '/todo'),
            position: 'top'
        },
        {
            label: 'Plantações',
            path: '/plantations',
            icon: <Sprout size={20} />,
            active: isNavItemActive(pathname, '/plantations'),
            position: 'top'
        },
        {
            label: 'Estoque',
            path: '/stock',
            icon: <Warehouse size={20} />,
            active: isNavItemActive(pathname, '/stock'),
            position: 'top'
        },
        {
            label: 'Financeiro',
            path: '/finance',
            icon: <Banknote size={20} />,
            active: isNavItemActive(pathname, '/finance'),
            position: 'top'
        },
        {
            label: 'Clima',
            path: '/weather',
            icon: <Cloudy size={20} />,
            active: isNavItemActive(pathname, '/weather'),
            position: 'top'
        },
        {
            label: 'Perfil',
            path: '/profile',
            icon: <CircleUserRound size={20} />,
            active: isNavItemActive(pathname, '/profile'),
            position: 'bottom'
        },
        {
            label: 'Sair',
            path: '/logout',
            icon: <LogOut size={20} />,
            position: 'bottom'
        },
    ];
}
