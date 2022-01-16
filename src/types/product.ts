export default interface ProductProps {
    name: string;
    count: number;
    price: number;
}

export enum UpdateEnums {
    increase = "INCREASE",
    decrease = "DECREASE"
}