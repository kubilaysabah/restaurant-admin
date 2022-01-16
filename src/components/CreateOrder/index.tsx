// Next
import Link from "next/link";
import router, { useRouter } from "next/router";

// React
import type { FC, ReactElement, ChangeEvent } from 'react';
import { memo, useState, Fragment, useEffect } from 'react';
import uniqid from "uniqid";

// Interface
import { OrderProps } from "types";

// Icons
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";

// Mocks
import { Products } from '__mocks__';

// Helpers
import { add, remove, update, calcTotal, addDB } from "helpers";

// Types
import { UpdateEnums } from "types";

const CreateOrder: FC = (): ReactElement => {
    const router = useRouter();

    const initialState = {
        number: Math.floor(Math.random() * (100000 + 999999 + 1) ) + 100000,
        date_and_time: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(Date.now()),
        name: "",
        contact: "",
        type: "Delivery",
        message: "",
        items: [],
        amount: 0
    };

    const [state, setState] = useState<OrderProps>(initialState);

    const [errors, setError] = useState<{
        name?: string;
        contact?: string;
        items?: string;
    }>({
        name: "",
        contact: "",
        items: ""
    });

    const [dropdown, toggleDropdown] = useState<boolean>(false);

    useEffect(() => {
        setError({
            name: state.name.length < 3 ? "This field required" : "",
            contact: state.contact.length < 3 ? "This field required" : "",
            items: state.items.length < 1 ? "This field required" : ""
        });
    }, [state]);

    useEffect(() => {
        setState({
            ...state,
            amount: calcTotal(state.items)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.items]);

    const addOrdertoDB = (): void => {
        addDB(state);
        setState(initialState);
        router.push("/");
    }

    return(
        <section className="px-5">
            <header className="py-5">
                <button className="flex items-center text-2xl">
                    <AiOutlineMenu />
                    <span className="ml-2">Create Order</span>
                </button>
            </header>

            <div className="lg:flex lg:flex-wrap lg:-mx-5">
                <div className="lg:flex-1 lg:px-5">
                    <div className="flex flex-wrap items-center mb-5">
                        <div>
                            <label className="font-medium">Order Number :</label>
                        </div>
                        <div>
                            <span className="ml-2 text-gray-500">#{state.number}</span>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center mb-5">
                        <div>
                            <label className="font-medium">Date & Time :</label>
                        </div>
                        <div>
                            <span className="ml-2 text-gray-500">{state.date_and_time}</span>
                        </div>
                    </div>

                    <div className="mb-10">
                        <label className="font-medium block mb-1">Name</label>
                        <input type="text" placeholder="John Doe" value={state.name} className="focus:outline-none w-full border py-2 px-3 rounded" onChange={(event: ChangeEvent<HTMLInputElement>) => setState({
                            ...state,
                            name: event.currentTarget.value
                        })} required />
                        <div className="text-red-500 mt-2">{errors.name}</div>
                    </div>

                    <div className="mb-10">
                        <label className="font-medium block mb-1">Contact</label>
                        <input type="text" placeholder="+91 8896589655" value={state.contact} className="focus:outline-none w-full border py-2 px-3 rounded" onChange={(event: ChangeEvent<HTMLInputElement>) => setState({
                            ...state,
                            contact: event.currentTarget.value
                        })} required />
                        <div className="text-red-500 mt-2">{errors.contact}</div>
                    </div>

                    <div className="mb-10">
                        <label className="font-medium">Trans Type</label>
                        <div className="flex flex-wrap items-center">
                            <div className="w-full sm:w-auto">
                                <div className="flex items-center">
                                    <input type="radio" checked={state.type === "Delivery"} onChange={() => setState({
                                        ...state,
                                        type: "Delivery"
                                    })} />
                                    <label className="block ml-2 cursor-pointer" onClick={() => setState({
                                        ...state,
                                        type: "Delivery"
                                    })}>Delivery</label>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto sm:ml-10">
                                <div className="flex items-center">
                                    <input type="radio" checked={state.type === "Takeaway"} onChange={() => setState({
                                        ...state,
                                        type: "Takeaway"
                                    })} />
                                    <label className="block ml-2 cursor-pointer" onClick={() => setState({
                                        ...state,
                                        type: "Takeaway"
                                    })}>Takeaway</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-10">
                        <label className="font-medium block mb-1">Message to client</label>
                        <textarea className="w-full rounded focus:outline-none h-60 border px-3 py-2" onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setState({
                            ...state,
                            message: event.currentTarget.value
                        })} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna id felis." value={state.message}></textarea>
                    </div>
                    <div className="mb-10">
                        <label className="font-medium block mb-1">Order Items</label>
                        <div className={`relative`}>
                            <div className="cursor-pointer border flex items-center px-3 py-2 rounded" onClick={() => toggleDropdown(!dropdown)}>
                                <div className="flex-1">
                                    {state.items.length === 0 ? (
                                        <span className="text-gray-400">Pending</span>
                                    ) : state.items.map((item, index) => (
                                        <span className="font-medium" key={uniqid()}>{index !== 0 && ", "}{item.name}</span>
                                    ))}
                                </div>
                                <BsChevronDown size={25} />
                            </div>
                            <div className={`absolute top-full left-0 z-10 bg-white border p-3 w-full ${!dropdown ? "hidden" : ""}`}>
                                <ul>
                                    {Products.map(product => (
                                        <li key={uniqid()}>
                                            <div className="flex items-center">
                                                <input type="checkbox" name="items" checked={state.items.filter(item => item.name === product.name)[0] ? true : false} onChange={() => setState({
                                                    ...state,
                                                    items: add(state.items, product.name)
                                                })} />
                                                <label className="block cursor-pointer font-medium ml-2"  onClick={() => setState({
                                                    ...state,
                                                    items: add(state.items, product.name)
                                                })}>{product.name}</label>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="text-red-500 mt-2">{errors.items}</div>
                    </div>
                    
                    <div>
                        <ul>
                            {state.items.length > 0 && state.items.map(item => (
                                <li key={uniqid()} className="flex flex-wrap items-center mb-5">
                                    <div className="w-full mb-1 sm:mb-0 sm:flex-1">
                                        <label className="font-medium">{item.name}</label>
                                    </div>
                                    <div className="w-full sm:w-auto">
                                        <div className="flex items-center justify-between lg:-mx-5">
                                            <div className="px-2 sm:px-5">
                                                <label className="font-medium">{item.price * item.count}$</label>
                                            </div>
                                            <div className="px-2 sm:px-5">
                                                <div className="flex items-center border-2 border-blue-600 rounded-full w-24 justify-between text-center">
                                                    <button className="flex-1" onClick={() => setState({
                                                        ...state,
                                                        items: update(state.items, item.name, UpdateEnums.decrease)
                                                    })}>-</button>
                                                    <span className="flex-1">{item.count}</span>
                                                    <button className="flex-1" onClick={() => setState({
                                                        ...state,
                                                        items: update(state.items, item.name, UpdateEnums.increase)
                                                    })}>+</button>
                                                </div>
                                            </div>
                                            <div className="px-2 sm:px-5">
                                                <button onClick={() => setState({
                                                    ...state,
                                                    items: remove(state.items, item.name)
                                                })}>
                                                    <AiOutlineClose size={25} color="#CCCCCC" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:flex-1 lg:px-5">
                     <section className="sticky top-0 py-5">
                         <header className="bg-gray-100 px-5 py-3 md:py-5 md:pl-5 md:pr-10 mb-5">
                            <h3 className="font-semibold text-lg mb-3">Delivery Details</h3>

                            <div className="grid grid-rows-3 grid-flow-col sm:grid-flow-row sm:grid-cols-3 gap-4 overflow-x-auto sm:overflow-visible">
                                <div className="text-gray-400 w-60 whitespace-nowrap md:flex-1">OrderItem</div>
                                <div className="text-gray-400 w-60 whitespace-nowrap md:flex-1">Number</div>
                                <div className="text-gray-400 w-60 whitespace-nowrap md:flex-1">Cost</div>
                                
                                {state.items.length > 0 ? state.items.map(item => (
                                    <Fragment key={uniqid()}>
                                        <div className="font-medium whitespace-nowrap">{item.name}</div>
                                        <div className="font-medium whitespace-nowrap">{item.count}</div>
                                        <div className="font-medium whitespace-nowrap">{item.price * item.count}$</div>
                                    </Fragment>
                                )): (
                                    <Fragment>
                                        <div className="font-medium whitespace-nowrap">-</div>
                                        <div className="font-medium whitespace-nowrap">-</div>
                                        <div className="font-medium whitespace-nowrap">-</div>
                                    </Fragment>
                                )}
                            </div>
                         </header>

                         <main className="bg-gray-100 p-3 sm:pl-5 sm:pr-10">
                             <div className="flex items-center justify-between">
                                 <div>
                                     <label className="font-semibold sm:text-2xl">Total Amount</label>
                                 </div>
                                 <div>
                                     <span className="font-medium sm:text-2xl">{state.amount}$</span>
                                 </div>
                             </div>
                         </main>

                         <footer className="flex flex-wrap items-center lg:-mx-5 mt-5">
                            <div className="w-full sm:flex-1 lg:px-5">
                                {errors.name.length === 0 && errors.items.length === 0 && errors.contact.length === 0 && (
                                    <Link href="/" passHref>
                                        <a className="w-full block text-center border rounded border-gray-300 text-gray-300 py-2 font-medium text-lg">Cancel</a>
                                    </Link>  
                                )}
                            </div>
                            <div className="w-full sm:flex-1 lg:px-5">
                                {errors.name.length === 0 && errors.items.length === 0 && errors.contact.length === 0 ? (
                                    <button className="w-full rounded bg-green-500 text-white py-2 font-medium text-lg" onClick={addOrdertoDB}>Add Order</button>
                                ): (
                                    <button className="w-full rounded bg-blue-500 text-white py-2 font-medium text-lg">Add Order</button>
                                )}
                                
                            </div>
                         </footer>
                     </section>
                </div>
            </div>
        </section>
    );
};

export default memo(CreateOrder);