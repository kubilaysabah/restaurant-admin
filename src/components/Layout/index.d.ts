// React
import type { ReactNode } from "react";

export default interface ILayout {
    children?: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
}