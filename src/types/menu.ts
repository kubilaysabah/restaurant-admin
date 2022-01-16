import type { ReactNode } from "react";

export default interface MenuProps {
    id: number;
    title: string;
    icon: ReactNode;
    children?: {
        title: string;
        url?: string;
        count: number;
    }[];
}