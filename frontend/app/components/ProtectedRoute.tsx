"use client";

import {
    useEffect,
    useState,
    ReactNode,
} from "react";

import { useRouter } from "next/navigation";

interface Props {
    children: ReactNode;
}

export default function ProtectedRoute({
    children,
}: Props) {
    const router = useRouter();

    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
            router.push("/login");
        } else {
            setAllowed(true);
        }
    }, [router]);

    if (!allowed) {
        return null;
    }

    return <>{children}</>;
}