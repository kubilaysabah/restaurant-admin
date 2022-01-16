// Types
import { ProductProps, UpdateEnums } from "types";

// Mocks
import { Products } from "__mocks__";

const check = (products: ProductProps[], name: string): ProductProps[] => {
    return products.filter(product => product.name === name);
};

const remove = (products: ProductProps[], name: string): ProductProps[] => {
    return products.filter(product => product.name !== name);
};

const add = (products: ProductProps[], name: string): ProductProps[] => {
    return check(products, name).length === 0 ? [...products, Products.filter(item => item.name === name)[0]] : remove(products, name);
};

const update = (products: ProductProps[], name: string, type: UpdateEnums.decrease | UpdateEnums.increase): ProductProps[] => {
    let arr = products;
    let product = check(arr, name)[0];
    arr = remove(arr, name);

    if(type === UpdateEnums.increase) {
        product.count++;
        return arr = [...arr, product];
    } else {
        if(product.count > 1) {
            product.count--;
            return arr = [...arr, product];
        } else {
            return arr;
        }
    }
};

const calcTotal = (products: ProductProps[]): number => {
    let total = 0;

    products.forEach(product => {
        total += product.count > 1 ? product.price * product.count : product.price;
    });

    return total;
};

export {
    check,
    add,
    remove,
    update,
    calcTotal
}