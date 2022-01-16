// Firebase
import { collection, addDoc, getDocs, query, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import Database from "config";

// Types
import { OrderProps } from "types";

const getDB = async (): Promise<OrderProps[]> => {
    let data = [];

    const querySnapshot = await getDocs(collection(Database, "orders"));
    querySnapshot.forEach((doc: any) => {
        data.push(doc.data());
    });

    return data;
}

const addDB = async (order: OrderProps) => {
    await addDoc(collection(Database, "orders"), order);
    
};

export {
    addDB,
    getDB
}