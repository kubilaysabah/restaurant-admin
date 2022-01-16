/* eslint-disable @next/next/no-img-element */
// Next
import { useRouter } from "next/router";
import Link from "next/link";

// React
import type { FC, ReactElement } from "react";
import { memo, useState } from "react";
import uniqid from "uniqid";

// Mocks
import { Menu } from "__mocks__";

const Sidebar: FC = (): ReactElement => {
    const router = useRouter();
    const [active, toggle] = useState<boolean>(true);

    const toggleHandler = (index: number): void => {
        index === 0 ? toggle(!active) : toggle(false);
    }

    return(
        <div className={`flex h-full bg-gray-200 ${active ? "fixed top-o left-0 w-full z-50 sm:static sm:w-auto" : ""}`}>
            <div>
                <ul>
                    <li>
                        <Link href="/" passHref>
                            <a className="p-3 block">
                                <img src="/logo.svg" alt="" />
                            </a>
                        </Link>
                    </li>
                    {Menu.map((item, index) => (
                        <li key={item.id}>
                            <button className={`py-3 w-full flex justify-center ${index === 0 ? "bg-gray-100" : ""}`} onClick={() => toggleHandler(index)}>
                                {item.icon}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            {active && (
                <div className="w-60 bg-gray-100 p-5">
                    <h2 className="text-3xl font-medium mb-5">{Menu[0].title}</h2>
                    <ul>
                        {Menu[0].children.map(child => (
                            <li key={uniqid()}>
                                {child.url ? (
                                    <Link href={child.url} passHref>
                                        <a className={`py-2 text-lg font-medium flex items-center justify-between ${router.pathname === child.url ? "text-blue-600" : ""}`}>
                                            <span>{child.title}</span>
                                            <span>{child.count}</span>
                                        </a>
                                    </Link>
                                ): (
                                    <button className="py-2 text-lg font-medium w-full flex items-center justify-between">
                                        <span>{child.title}</span>
                                        <span>{child.count}</span>
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
};

export default memo(Sidebar);
