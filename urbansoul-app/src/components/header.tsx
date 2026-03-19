'use client'
import { useState } from 'react'
import { OutsideClick } from '../@utils/outsideClick'
import { getBagItemsStore } from '../@utils/storageTreatment'

import type { FilteredProductsName, ItemsInterface } from '../@types/products'
import type { AccountInterface } from '../@types/customer'

import { ModalAccount } from './modals/modalAccount'
import { ModalBag } from './modals/modalBag'
import { ModalLogin } from './modals/modalLogin'

const logo = '/logos/logo.svg'
const search_svg = '/logos/search.svg'
const bag = '/logos/shopping_bag.svg'
const account = '/logos/account_circle.svg'

// search all names
const filterProductsName: FilteredProductsName[] = [
    {id: 1, name: 'Camisa Tech Feminina'},
    {id: 2, name: 'Camisa Tech MASC'},
    {id: 3, name: 'Camisa Tech UNI'},
    {id: 4, name: 'Camisa Tech Feminina'},
    {id: 5, name: 'Camisa Tech Feminina'}
]
let filteredProductName: FilteredProductsName[] = []

const accountInfo: AccountInterface = {}
// {
//     id: 1,
//     first_name: "Icaro",
//     last_name: "O",
//     email: "icaro@email.com"
// }

export function Header(){
    // RESGATANDO ITEMS DA STORAGE
    const bagItems: ItemsInterface[] = getBagItemsStore()

    const [openAcc, setOpenAcc] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [search, setSearch] = useState("");
    const [dropdown, setDropdown] = useState(false);

    // path
    const path: string = window.location.pathname;

    // TODO: MANDAR SEARCH PRO BACK E PESQUISAR LÁ
    let filter = (text: string) => {
        setSearch(text);

        if (search != "")
            setDropdown(true)

        filteredProductName = filterProductsName.filter((item: FilteredProductsName) =>
            item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    }

    const handleDropdown = () => {
        setDropdown(false)
    }

    const handleModalAcc = () => {
        if (Object.keys(accountInfo).length === 0)
            setOpenLogin(!openLogin);
        else
            setOpenAcc(!openAcc);
    }

    const [openBag, setOpenBag] = useState(false);
    const handleModalBag = () => {
        if (bagItems.length != 0)
            setOpenBag(!openBag);
    }

    const hasItem = () => {
        if (bagItems.length == 0) return null;
        
        return (
            <div className="absolute -mt-1 ml-3 w-5 h-5 bg-red rounded-full content-center">
                <p className="flex justify-center font-bold font-noto text-light text-xs">
                    {bagItems.length}
                </p>
            </div>
        )
    }

    const ref = OutsideClick(() => {
        handleDropdown()
    });

    const handleClose = () => {
        if (openBag)
            setOpenBag(false);
        if (openAcc)
            setOpenAcc(false);
        if (openLogin)
            setOpenLogin(false);
    }

    return (
    <div className="bg-light">
        <div className="flex justify-center w-full h-10 bg-dark-gray mb-2">
            <p className="text-light md:text-sm text-xs font-bold font-noto content-center ">UMA REVOLUÇÃO NO SEU GUARDA ROUPA</p>
        </div>

        <div className="flex mx-10 h-15 justify-between">
            <div className="content-center">
                <a href= "/">
                    <img src={logo} alt="Urban Soul" />
                </a>
            </div>

            <div className={ (path != '/') ? "hidden" :
                "md:grid hidden grid-flow-col gap-4 content-center font-noto text-sm text-dark-gray"}>
                <a href="/search/M" className="hover:font-bold hover:underline underline-offset-4 decoration-red decoration-2" >Masculino</a> 
                <a href="/search/F" className="hover:font-bold hover:underline underline-offset-4 decoration-red decoration-2" >Feminino</a>
                <a href="/search/U" className="hover:font-bold hover:underline underline-offset-4 decoration-red decoration-2" >Kids</a>
            </div>

            <div className="content-center">

            <div ref={ref} className="flex">

                <div className="">
                    <div className="flex bg-light-gray w-40 h-5 rounded-2xl hover:border-1">
                        <img className="ml-2 h-3.5 w-3.5 my-0.5" src={search_svg} alt=""/>

                        <input type="text" className="ml-2 text-gray font-bold font-noto text-xs content-center outline-none "
                                name="filter" placeholder="Buscar" size={12} autoComplete="off"
                                onChange={(e) => {filter(e.target.value)}}/>
                    </div>

                    <ul className={(!dropdown || filteredProductName.length == 0) ? "hidden" :
                        "fixed mt-3 max-h-32 w-60 bg-dark-gray rounded-lg overflow-y-scroll outline-2 outline-dark-gray"}>
                        {filteredProductName.map((item, index) => (
                            <li key={index} >
                                <hr className={(index == 0 ) ? "hidden" : "text-gray h-0.5"}/>

                                <a href={"/product/"+ item.id} className="mx-2 font-noto text-sm text-bglight font-bold cursor-pointer">
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                
                <div className="flex ml-4 gap-2">
                    {hasItem()}
                    <button className="cursor-pointer" onClick={handleModalBag}>
                        <img src={bag} alt=""/>
                    </button>

                    <button className="cursor-pointer" onClick={handleModalAcc}>
                        <img src={account} alt=""/>
                    </button>
                </div>
            </div>
            </div>
        </div>

        <div className="flex justify-end">
            { openBag && <ModalBag items={bagItems} closeModal={handleClose}/> }
            { openAcc && <ModalAccount account={accountInfo} closeModal={handleClose} /> }
            { openLogin && <ModalLogin closeModal={handleClose}></ModalLogin>}
        </div>

    </div>
    )
}