import type { ItemsInterface } from "../@types/products";

export const formatMoney = (amount: number) => {
    return amount.toLocaleString('pt-BR',
        {style: 'currency', currency:'BRL'})
};

export const percent = (price: number, descount: number) => {
    const descountValue = 100 -( (descount * 100) / price )

    return descountValue.toFixed(0).toString() + "% OFF"
}

export const parcel = (price: number) => {
    return parseInt((price / 12).toFixed(2)) 
}

export const hasDescount = (item: ItemsInterface) => {
    return (item.Descount_price != undefined && item.Descount_price > 0)
}

export const GetImgOrErrorImg = (item: ItemsInterface) => {
    const warning = '/logos/warning.svg'

    if (item.Img_url != undefined)
        return `/images/${item.Img_url}`
    
    return warning
}