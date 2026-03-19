import { useState } from "react";
import type { ItemsInterface } from "../@types/products";

import { formatMoney, GetImgOrErrorImg, hasDescount } from "../@utils/formats";
import { total } from "../@utils/financial";
import { getBagItemsStore } from "../@utils/storageTreatment";
import { transport, cupoms } from "../@utils/staticData";

import { InputTextBox } from "../components/input";
import { BlackButton, WhiteButton } from '../components/button';
import { NotificationPopOut } from "../components/notificationPopOut";
import type { NotificationInterface } from "../@types/notification";

const search_svg = '/logos/search.svg'

let notificationData: NotificationInterface = {
    isError:  false, 
    message: ''
}

export default function PaymentPage(){
    const bagItems: ItemsInterface[] = getBagItemsStore()
    const [openNotification, setOpenNotification] = useState(false)

    const [cupom, setCupom] = useState("")
    const [radio, setRadio] = useState(transport[0].name)

    const validCupom = cupoms.find(element => element.name == cupom)
    const chosenRadio = transport.find(element => element.name == radio)

    const handleRadio = () => {
        const radiocheck = document.querySelector<HTMLInputElement>('input[name="frete"]:checked');

        if (radiocheck != undefined)
            setRadio(radiocheck?.id)
    }

    const totalWithCupom = (_total: number) => {
        return _total + ((validCupom != undefined) ? validCupom?.value : 0)  +
                ((chosenRadio != undefined) ? chosenRadio.price : 0)
    }
    

    const setPayment = () => {
        notificationData = { isError: false, message: 'Pagamento' }
        setOpenNotification(true)
        localStorage.clear()
    }

    const handleClose = () => {
        setOpenNotification(false)
    }

    const checkboxStyle: string = ("appearance-none rounded-sm h-4 w-4 border border-gray" +
                                    " checked:border-2 checked:outline-1 checked:border-light checked:bg-dark-gray");

    return(
        <div className="md:h-175 m-10 bg-light">
            <div className="flex content-center font-noto text-dark-gray md:text-sm text-xs">

                <div className="m-5 w-1/3">
                    <div>
                        <p className="font-bold text-xl">Contato</p>

                        <div className="md:grid md:grid-cols-2 md:gap-4 my-5">
                            <InputTextBox type='text' name='email' p_name='E-mail'></InputTextBox>
                            <InputTextBox type='tel' name='phone' p_name='Telefone'></InputTextBox>
                            <InputTextBox type='text' name='name' p_name='Nome'></InputTextBox>
                            <InputTextBox type='text' name='lastname' p_name='Sobrenome'></InputTextBox>
                        </div>
                    </div>


                    <div>
                        <p className="font-bold text-xl">Endereço de Entrega</p>

                        <div className="md:grid md:grid-cols-2 md:gap-4 my-5">
                            <div className="col-span-2">
                                <p className="mb-2 ">CEP</p>
                                 <div className="flex outline-1 rounded-xs text-gray h-8 w-1/3 content-center">
                                    <input type="text" name="postalcode" maxLength={10}
                                    className="ml-2 text-base text-dark-gray w-full outline-none"/>
                                    <img src={search_svg} alt="" className="h-4 w-4 m-2"/>
                                </div>
                            </div>

                            <InputTextBox type='text' name='address' p_name='Endereço'></InputTextBox>

                            <div>
                                <p className="mb-2">Número</p>
                                 <div className="outline-1 rounded-xs text-gray w-1/4 h-8 content-center">
                                    <input type="text" name="number" maxLength={5}
                                    className="ml-2 text-base text-dark-gray w-full outline-none"/>
                                </div>
                            </div>

                            <InputTextBox type='text' name='complement' p_name='Complemento'></InputTextBox>
                            <InputTextBox type='text' name='district' p_name='Bairro'></InputTextBox>
                            <InputTextBox type='text' name='city' p_name='Cidade'></InputTextBox>
                            <InputTextBox type='text' name='state' p_name='Estado'></InputTextBox>

                        </div>
                    </div>
                    
                </div>

                <hr className="md:flex hidden w-0.5 m-10 h-150 bg-gray rounded-sm"/>

                <div>
                    <ul className="m-5 h-65 overflow-y-auto">
                        {bagItems.map((item, index) => (
                            
                            <li key={index} className="flex outline rounded-sm m-2">

                                <div className="m-2 flex">
                                    <div className="h-20 w-20 self-center">
                                        <img src={GetImgOrErrorImg(item)} alt="imagem do produto"
                                            className="h-20 w-18 p-1 bg-bglight rounded-lg" />
                                    </div>

                                    <div className="flex font-noto text-dark-gray text-sm">
                                        <div className="w-1/2">
                                            <p>{item.Product_name}</p>
                                            <p className="text-xs font-bold">{item.Size}/{item.Color}</p>
                                        </div>
                                            
                                        <div className="font-bold mt-1 content-center">
                                            <p className={(hasDescount(item)) ? "text-gray text-xs mr-4 line-through" : ""}>
                                                {formatMoney(item.Price)}
                                            </p>
                                            <p className={(hasDescount(item)) ? "" : "hidden"}>{formatMoney(item.Descount_price)}</p>
                                        </div>

                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="w-full h-5 content-center">
                        <div className="font-noto text-dark-gray text-sm font-bold mx-4">

                            <div className="flex font-normal">

                                <p className="mr-10 mb-5 w-20 text-xs">Cupom de Desconto</p>

                                <div className="outline-1 rounded-xs text-gray h-8 w-50 content-center">
                                    <input type="text" name="email" placeholder="Insira Cupom" onChange={(e) => { setCupom(e.target.value)}}
                                    className="mx-2 text-xs text-dark-gray w-45 outline-none"/>
                                </div>
                            </div>

                            <p className="text-xs"> {bagItems.length} Itens</p>

                            <hr className="my-1"/>

                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>{formatMoney(total(bagItems))}</p>
                            </div>

                                <div className={(validCupom != undefined) ? "flex mt-1 justify-between" : "hidden"}>
                                    <p>{validCupom?.name}</p>
                                    <p> - {(validCupom != undefined) ? formatMoney(validCupom?.value) : ""}</p>
                                </div>

                                <hr className="my-1"/>

                                <div>
                                    <p>Frete</p>

                                <ul className="mt-2">
                                    {transport.map((item, index) => (
                                        <li key={index} className="flex mb-1">
                                            <input type="radio" name="frete" id={item.name} checked={item.name == radio}
                                                    onChange={handleRadio} className={checkboxStyle}/>

                                            <p className="ml-2 font-normal">
                                                <span className="font-bold">{item.name}</span>
                                                - Entrega em {item.days} dias </p>

                                            <p className="font-normal ml-15"> {formatMoney(item.price)}</p>
                                        </li>
                                    ))}
                                </ul>

                            </div>

                            <hr className="my-1"/>

                            <div className="flex justify-between">
                                <p>Total</p>
                                <p>{formatMoney(totalWithCupom(total(bagItems)))}</p>
                            </div>
                        </div>

                        <div className="flex justify-end mt-10">
                            <WhiteButton p_text="Cancelar" width="w-25" href="/"></WhiteButton>
                            <BlackButton p_text="Continuar para pagamento" width="w-60" on_click={setPayment}></BlackButton>
                        </div>
                    </div>
                </div>
            </div>

            { openNotification && <NotificationPopOut notification={notificationData} closeNotification={handleClose} ></NotificationPopOut>}

        </div>
    )
}