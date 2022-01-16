// React
import type { FC, ReactElement } from 'react';
import { memo } from 'react';
import uniqid from "uniqid";

// Interface
import OrderCardProps from "./index.d";

// Icons
import { BsPrinter } from "react-icons/bs";

const Order: FC<OrderCardProps> = ({
    className = "",
    ...rest
}): ReactElement<OrderCardProps> => {
    return(
        <section className={`border rounded px-5 py-3 ${className}`}>
            <ul className="md:flex md:flex-wrap xl:justify-between -mx-3">
                <li className="mb-3 px-3">
                    <h4 className="text-gray-500">Order Number</h4>
                    <p className="font-medium">{rest.number}</p>
                </li>
                <li className="mb-3 px-3">
                    <h4 className="text-gray-500">Date & Time</h4>
                    <p className="font-medium">{rest.date_and_time}</p>
                </li>
                <li className="mb-3 px-3">
                    <h4 className="text-gray-500">Name</h4>
                    <p className="font-medium">{rest.name}</p>
                </li>
                <li className="mb-3 px-3">
                    <h4 className="text-gray-500">Contact</h4>
                    <p className="font-medium">{rest.contact}</p>
                </li>
                <li className="mb-3 px-3">
                    <h4 className="text-gray-500">Trans Type</h4>
                    <p className={`inline-block font-medium px-2 text-white rounded ${rest.type === "Delivery" ? "bg-blue-600" : "bg-yellow-500"}`}>{rest.type}</p>
                </li>
                <li className="mb-3 px-3">
                    <h4 className="text-gray-500">Amount</h4>
                    <p className="font-medium">{rest.amount}$</p>
                </li>
            </ul>
            <div className="lg:flex lg:items-center my-5">
                <div>
                    <h4 className="text-gray-500 font-medium">Ordered 
                        <span className="ml-2 lg:ml-0 lg:block">Items</span>
                    </h4>
                </div>
                <div>
                    <ul className="md:flex md:flex-wrap md:items-center -mx-3">
                        {rest.items.map(item => (
                            <li className="px-3 mb-2" key={uniqid()}>
                                <span className="bg-gray-200 font-medium py-2 px-5 flex items-center whitespace-nowrap">
                                    {item.name} X {item.count}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="lg:flex lg:items-center">
                <div className="lg:flex-1">
                    <h4 className="text-gray-500">Additional information from customer</h4>
                    <p className="font-semibold">{rest.message}</p>
                </div>
                <div>
                    <div className="mt-5 flex items-center justify-between lg:justify-start lg:mt-0">
                        <div>
                            <BsPrinter color="#989899" size={30} />
                        </div>
                        <div className="ml-5">
                            <button className="bg-blue-500 text-white py-2 px-5">Move to Cooking</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export type {
    OrderCardProps
}
export default memo(Order); 