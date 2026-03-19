import { useState } from "react";

import type { ItemsInterface } from "../../@types/products";

import { formatMoney, hasDescount, GetImgOrErrorImg } from "../../@utils/formats"; 
import { total, subtotal, descounts } from "../../@utils/financial"; 
import { OutsideClick } from "../../@utils/outsideClick";
import { UpdateBagItemsStore } from "../../@utils/storageTreatment";

const delete_icon = '/logos/delete.svg'

interface ModalBagProps {
    items:ItemsInterface[];
    closeModal: () => void;
}

export function ModalBag (data: ModalBagProps) {
    const [items, setItems] = useState(data.items)

    const deleteFromBag = (index: number) => {
        const updateItems: ItemsInterface[] = [
            ...items.slice(0, index),
            ...items.slice(index+1)
        ]
            
        setItems(updateItems)
        UpdateBagItemsStore(updateItems)
        
        if (updateItems.length == 0)
            data.closeModal()
    }

    // CLICK OUTSIDE CLOSE MODAL
    const ref = OutsideClick(() => {
        data.closeModal()
    });

    return(
        <div ref={ref} className="fixed top-1/8 right-2 w-100 h-140 bg-light-gray font-noto outline-1 outline-dark-gray mt-2 mr-2 rounded-sm">

            <div className="w-full h-15 bg-light content-center row-end-1">
                <div className="flex mx-4 font-bold text-dark-gray text-base justify-between">
                    <p>MINHA SACOLA</p>
                    <button className="cursor-pointer" onClick={data.closeModal}>X</button>
                </div>
            </div>

            <div>
                <ul className="m-5 h-65 overflow-y-auto">
                    {items.map((item, index) => (
                        <li key={index} className="flex bg-light my-2 rounded-+sm">

                            <div className="m-2 flex">
                                <div className="h-20 w-20 self-center">
                                    <img src={GetImgOrErrorImg(item)} alt="imagem do produto"
                                        className="h-20 w-18 p-1 bg-bglight rounded-lg" />
                                </div>

                                <div className="font-noto text-dark-gray text-sm">
                                    <p>{item.Product_name}</p>
                                    <p className="text-xs font-bold">{item.Size}/{item.Color}</p>

                                    <div className="flex font-bold mt-1">
                                        <p className={hasDescount(item) ? "text-gray text-xs mr-4 line-through" : ""}>
                                            {formatMoney(item.Price)}
                                        </p>
                                        <p className={hasDescount(item) ? "" : "hidden"}>{formatMoney(item.Descount_price)}</p>
                                    </div>

                                </div>

                                <button className="cursor-pointer flex ml-20 text-dark-gray" onClick={_ => deleteFromBag(index)}>
                                    <img src={delete_icon} alt="" />
                                </button>
                            </div>
                        </li>
                    ))}

                </ul>

            </div>

            <div className="w-full h-50 bg-light content-center">
                <div className="font-noto text-dark-gray text-sm font-bold mx-4">

                    <div className="flex my-1 justify-between">
                        <hr className="my-1 w-1/3"/>

                        <p className="text-xs">
                            {(items).length} itens
                        </p>

                        <hr className="my-1 w-1/3"/>

                    </div>

                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p>{formatMoney(subtotal(items))}</p>
                    </div>
                    <hr className="my-1"/>

                    <div className="flex justify-between">
                        <p>Descontos</p>
                        <p>{formatMoney(descounts(items))}</p>
                    </div>
                    <hr className="my-1"/>

                    <div className="flex justify-between">
                        <p>Total</p>
                        <p>{formatMoney(total(items))}</p>
                    </div>
                </div>

                <div className="flex justify-center mt-2">
                    <a href="/pay" className="cursor-pointer text-base text-bglight bg-dark-gray font-bold p-2 rounded-2xl">
                        Finalizar Compra
                    </a>
                </div>
                
            </div>
        </div>
    )
}