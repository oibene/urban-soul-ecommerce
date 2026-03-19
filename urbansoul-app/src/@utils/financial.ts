import type { ItemsInterface } from "../@types/products";
import { hasDescount } from "./formats";

// total sem desconto
export const subtotal = (data: ItemsInterface[]) => {
    return data.map(item => 
        item.Price).reduce(
            (total: number, current: number) => total + current, 0
        );
}

// descontos
export const descounts = (data: ItemsInterface[]) => {
    return data.map(item => 
        (hasDescount(item)) ? (item.Price - item.Descount_price) : 0 ).reduce(
            (total: number, current: number) => total + current, 0
        );
}

// total com desconto
export const total = (data: ItemsInterface[]) => {
    return data.map(item =>
        (hasDescount(item)) ? item.Descount_price : item.Price).reduce(
            (total: number, current: number) => total + current, 0
        );
}