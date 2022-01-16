import type { OrderProps } from "types";
import Products from "./products";

const Orders: OrderProps[] = [
    {
        number: "#988123",
        date_and_time: "01/01/2020 at 2:14Pm",
        name: "Devansh Mittale",
        contact: "+91 8896589655",
        type: "Delivery",
        amount: 455,
        message: "Please send salad and green chantni with 2 paper dish.",
        items: Products
    },
    {
        number: "#988123",
        date_and_time: "01/01/2020 at 2:14Pm",
        name: "Devansh Mittale",
        contact: "+91 8896589655",
        type: "Takeaway",
        amount: 488,
        message: "Please send salad and green chantni with 2 paper dish.",
        items: Products
    },
    {
        number: "#988123",
        date_and_time: "01/01/2020 at 2:14Pm",
        name: "Devansh Mittale",
        contact: "+91 8896589655",
        type: "Takeaway",
        amount: 488,
        message: "Please send salad and green chantni with 2 paper dish.",
        items: Products
    },
];

export default Orders;