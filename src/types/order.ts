export default interface OrderProps {
    number: number;
    date_and_time: string;
    name: string;
    contact: string;
    type: string;
    message: string;
    items: {
        name: string;
        count: number;
        price: number;
    }[];
    amount: number;
}