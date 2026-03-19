import { useEffect, useState } from "react";
import type { AccountInterface } from "../@types/customer";

export function PostCustomerAccount(account: AccountInterface) {
    // QUANDO FUNCTIONS SAO CHAMADAS POR BOTOES, NAO USE USEEFFECT !!!
    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/customers/account`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(account),
            });

            if (!response.ok)
                throw new Error(`HTTP error! status: ${response.status}`)

        } catch(error) {
            console.log(error)
        }
    }; fetchData();
}

export function GetCustomerAccount(id: number): AccountInterface{
    const [data ,setData] = useState<AccountInterface>({} as AccountInterface);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/customers?customer_id=${id}`, {
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

    return data;
}
