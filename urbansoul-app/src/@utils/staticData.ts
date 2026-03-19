import type { CarouselInterface } from "../@types/products"

export const transport = [
    {
        name: "Sedex",
        days: 4,
        price: 0
    },
    {
        name: "Sedex2",
        days: 2,
        price: 10
    },
]

export const cupoms = [
    {
        name: "CUPOM100",
        value:100
    },
    {
        name: "CUPOM50",
        value:50
    },
]

export enum colors {
    Branco = 'bg-[#D9D9D9]',
    Preto = 'bg-[#1E1E1E]',
    Vermelho = 'bg-[#990100]',
    Bege = 'bg-[#C5A385]',
}

export enum gender {
    F = 'Feminino',
    M = 'Masculino',
    U = 'Unissex',
}

export enum size{
    PP = 'PP',
    P ='P',
    M = 'M',
    G = 'G',
    GG = 'GG'
}

export const carouselFemImgs: CarouselInterface[] = [
    {img_URL: '/images/category0.svg', category: "CAMISA SIMPLES", type: "Camisas"},
    {img_URL: '/images/category1.svg', category: "MANGA LONGA", type: "Novidades"},
    {img_URL: '/images/category2.svg', category: "MOLETOM", type: "Conforto"},
    {img_URL: '/images/category3.svg', category: "CASACOS", type: "Conforto"},
    {img_URL: '/images/category0.svg', category: "CAMISA SIMPLES", type: "Camisas"},
    {img_URL: '/images/category1.svg', category: "MANGA LONGA", type: "Novidades"},
]