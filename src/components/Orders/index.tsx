// Next
import Link from "next/link";

// React
import type { FC, ReactElement } from 'react';
import { memo, useEffect, useState } from 'react';
import uniqid from "uniqid";

// Icons
import { AiOutlineMenu } from "react-icons/ai";

// Components
import { Order } from "components";

// Types
import { OrderProps } from "types";

// Helpers
import { getDB } from "helpers";

const Orders: FC = (): ReactElement => {
    const [OrderList, setOrderList] = useState<OrderProps[] | null>(null);

    const getDataFromDB = async() => {
        let data = await getDB();
        setOrderList(data);
    };

    useEffect(() => {
        getDataFromDB();
    }, []);

    return(
        <section className="px-5">
            <header className="py-5">
                <button className="flex items-center text-2xl">
                    <AiOutlineMenu />
                    <span className="ml-2">Accepted</span>
                </button>

                <div className="md:flex md:items-center md:justify-between mt-10">
                    <div className="w-full mb-3 md:w-auto">
                        <button className="w-full bg-gray-200 flex items-center justify-center p-2 rounded">
                            <AiOutlineMenu />
                            <span className="ml-2">Showing 10 Orders</span>
                        </button>
                    </div>
                    <div>
                        <Link href="/create" passHref>
                            <a className="bg-blue-600 text-white py-2 px-4 block text-center">
                                Add New Order
                            </a>
                        </Link>
                    </div>
                </div>

                <hr className="mt-5" />
            </header>
            <main>
                {OrderList?.map((order, index) => (
                    <Order className={index > 0 ? "mt-5" : ""} key={uniqid()} {...order} />
                ))}
            </main>
        </section>
    );
};

export default memo(Orders);