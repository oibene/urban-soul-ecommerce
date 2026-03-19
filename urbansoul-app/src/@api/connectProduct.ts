import {useEffect, useState } from 'react';
import type { CategoryInterface, DetailsInterface, ImagesInterface, ItemsInterface } from '../@types/products';
import type { CommentsInterface } from '../@types/customer';

export function GetProductsById(id: number): ItemsInterface{
    const [data, setData] = useState<ItemsInterface>({} as ItemsInterface);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products?product_id=${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`)

                const result = await response.json()
                setData(result[0])

            } catch(error) {
                console.log(error)
            }
        }; fetchData();
    }, [id])

    return data
}

export function ListProducts(): ItemsInterface[]{
    const [data, setData] = useState<ItemsInterface[]>([] as ItemsInterface[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/products/list`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`)

                const result = await response.json()
                setData(result)

            } catch(error) {
                console.log(error)
            }
        }; fetchData();
    }, [])

    return data
}

export function ListCategories(): CategoryInterface[]{
    const [data, setData] = useState<CategoryInterface[]>([] as CategoryInterface[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/categories`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`)

                const result = await response.json()
                setData(result)

            } catch(error) {
                console.log(error)
            }
        }; fetchData();
    }, [])

    return data
}

export function GetDetailsByProductId(id: number): DetailsInterface{
    const [data, setData] = useState<DetailsInterface>({} as DetailsInterface);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/details?product_id=${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`)

                const result = await response.json()
                setData(result[0])

            } catch(error) {
                console.log(error)
            }
        }; fetchData();
    }, [id])

    return data
}

export function GetCommentsByProductId(id: number): CommentsInterface[]{
    const [data, setData] = useState<CommentsInterface[]>([] as CommentsInterface[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/comments?product_id=${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`)

                const result = await response.json()
                setData(result)

            } catch(error) {
                console.log(error)
            }
        }; fetchData();
    }, [id])

    return data
}

export function GetImagesByProductId(id: number): ImagesInterface[]{
    const [data, setData] = useState<ImagesInterface[]>([] as ImagesInterface[]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/images?product_id=${id}`, {
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok)
                    throw new Error(`HTTP error! status: ${response.status}`)

                const result = await response.json()
                setData(result)

            } catch(error) {
                console.log(error)
            }
        }; fetchData();
    }, [id])

    return data
}