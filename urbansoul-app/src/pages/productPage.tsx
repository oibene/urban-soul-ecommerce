import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

import { GetCommentsByProductId, GetDetailsByProductId, GetImagesByProductId, GetProductsById } from '../@api/connectProduct';

import type { DetailsInterface, ImagesInterface, ItemsInterface } from '../@types/products';
import type { CommentsInterface } from '../@types/customer';

import { percent, formatMoney, parcel, hasDescount } from '../@utils/formats';
import { AddBagItemsStore } from '../@utils/storageTreatment';
import { colors, size } from '../@utils/staticData';

import { ProductNotFound } from './errorPage';
import { BlackButton } from '../components/button';
import { ProductCarousel } from '../components/productCarousel';

const star = '/logos/star_rate.svg'
const blk_star = '/logos/star_rate_blk.svg'


export default function ProductPage(){
    const { id } = useParams();
    const navigate = useNavigate()

    const productId = (id != undefined) ? parseInt(id) : 0
    const item: ItemsInterface = GetProductsById(productId)
    const details: DetailsInterface = GetDetailsByProductId(productId)
    const comments: CommentsInterface[] = GetCommentsByProductId(productId)
    const images: ImagesInterface[] = GetImagesByProductId(productId)

    const [component, setComponent] = useState(0)
    const [productColor, setProductColor] = useState("Preto")
    const [productSize, setProductSize] = useState("M")
    const [productQtd, setProductQtd] = useState(1)

    const comments_count: number = (comments != null) ? comments.length : 0

    const rating = (comments_count > 0 ) ? (
            comments.map(comment => comment.Rating).reduce(
                (total: number, current:number) => total + current, 0)
                / comments_count ) : 0
    
    const handleColor = () => {
        const colorBtn = document.querySelector<HTMLInputElement>('input[name="color"]:checked');
        if (colorBtn != undefined)
            setProductColor(colorBtn?.id)
    }
    
    const qtdLimit = 5
    const addQtd = () => {
        if (productQtd < qtdLimit)
            setProductQtd(productQtd + 1)
        else
            setProductQtd(qtdLimit)
    }
    
    const subQtd = () => {
        if (productQtd > 1)
            setProductQtd(productQtd - 1)
        else
            setProductQtd(1)
    }

    //#region  PREFERENCES TREATMENT
    const sendPreferences = () => {
        const bagItem: ItemsInterface =  {
            Product_id: item.Product_id,
            Product_name: item.Product_name,
            Size: productSize,
            Gender: item.Gender,
            Category: item.Category,
            Color: productColor,
            Price: item.Price,
            Descount_price: item.Descount_price,
            Img_url: item.Img_url
        }

        console.log("send")

        const bagItems: ItemsInterface[] = new Array(productQtd-1).fill(bagItem);
        bagItems.push(bagItem)
        AddBagItemsStore(bagItems)

        navigate(0)
    }
    //#endregion

    //#region DETAILS TREATMENT

    let desc_title: string = ""
    let desc_text: string = ""
    let notes_title: string = ""
    let notes_text: string = ""
    let notes_text_items: string[] = []
    let composition_items: string[] = []

    if (details.Description != undefined){
        desc_title = details.Description.slice(0, details.Description.indexOf('-') +1);

        desc_text = details.Description.slice( ((desc_title != "") ?
                                details.Description.indexOf('-')+1 : 0) , details.Description.length)
    }
    
    if (details.Notes != undefined){

        notes_title = details.Notes.slice(0, details.Notes.indexOf(':') +1);
    
        notes_text = details.Notes.slice( ((notes_title != "") ?
                                details.Notes.indexOf(':')+1 : 0) , details.Notes.length)
        
        notes_text_items = notes_text.split(';');
    }

    if (details.Composition != undefined)
        composition_items = details.Composition.split(';');

    //#endregion

    //#region COMMENTS TREATMENT
        const formatName = (name:string, lastName:string) => {
            return ((name != undefined) ? name : "") +
                    ((lastName != undefined) ? (" " + lastName) : "")
        }

        const commentLimit = 75
        const limitComment = (comment: string) => {
            if (comment.length > commentLimit)
                return comment.slice(0, commentLimit)

            return comment
        }

        //#endregion

    //#region ABAS

    enum tabs {
        DSC,
        CPM,
        FRT,
        COM
    }

    const tabType = () => {

        switch(component) {
            case tabs.DSC:
                return (
                    <div className="w-75 text-sm font-noto">
                        <p>
                            <span className="font-bold">
                                {desc_title}
                            </span>
                            {desc_text}
                        </p>

                        <p className="mt-2 font-bold">
                            {notes_title}
                        </p>

                        <ul className="ml-5 list-disc">
                            {notes_text_items != undefined && notes_text_items.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                )
            
            case tabs.CPM:
                return (
                    <div className="text-sm ">
                            <ul className="ml-5 list-disc">
                                {composition_items != undefined && composition_items.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                    </div>
                )

            case tabs.FRT:
                return (<div></div>)
            
            case tabs.COM:
                return (
                    <div className={comments.length > 2 ? "w-100 h-68 overflow-y-scroll overflow-x-hidden font-noto text-dark-gray text-sm" :
                                                            "w-100 h-70 font-noto text-dark-gray text-sm"}>
                        <ul>
                            {comments.map((comment) => 
                                <li key={comment.Comment_id}>

                                    <div className="flex mr-8">
                                        {Array.from({ length: comment.Rating }).map((_, index) => (
                                            <img key={index} src={blk_star} alt="" className="w-5 h-5" />
                                        ))}
                                    </div>

                                    <div className="flex text-xs my-2">
                                        <p className="font-bold">{formatName(comment.Customer_name, comment.Customer_last_name)}</p>
                                        <p className="flex ml-1">-</p>
                                        <p className="ml-1">{comment.Comment_date}</p>
                                    </div>

                                    <div className="flex">
                                        <p className="my-2 w-75 wrap-break-word"> "{limitComment(comment.Comment)}" </p>
                                    </div>

                                    <hr className="my-2 w-95 bg-dark-gray rounded-sm"/>
                                </li>
                            )}
                        </ul>
                    </div>
                )

            default:
                return (<div></div>)
        }
    } 

    //#endregion

    if (id != undefined ){
        if (parseInt(id) != item.Product_id ){
            return (
                <ProductNotFound></ProductNotFound>
            )
        }
    }

    return(
        <div className="lg:flex my-5 mx-25 font-noto text-dark-gray lg:text-sm text-base">

            {images != null && <ProductCarousel images={images} ></ProductCarousel>}

            <div className="lg:w-120 lg:h-200 w-160 p-2 bg-light">
                <div className="m-5">
                    <p className="font-bold lg:text-xl text-2xl">{item.Product_name.toUpperCase()}</p>
                </div>

                <div className="flex m-5">
                    <div className="flex mr-8">
                        {Array.from({ length: rating }).map((_, index) => (
                            <img key={index} src={star} alt="" className="lg:w-5 lg:h-5 w-8 h-8"/>
                        ))}
                    </div>

                    <div className="lg:h-6 lg:w-6 h-8 w-8 bg-light-gray rounded-sm content-center">
                        <p className="lg:mx-0.5 mx-1">{rating.toFixed(1)}</p>
                    </div>

                    <div className="ml-3 text-sm text-gray content-center">
                        <p className="flex">{comments_count} avaliações</p>
                    </div>
                </div>

                <div className="m-4 h-15 bg-light-gray rounded-sm">

                    <div className="flex mx-4 justify-between">

                        <div className="flex mt-2">
                            <p className={(hasDescount(item)) ? "font-bold text-green mr-2" : "font-bold"}>
                                {(hasDescount(item)) ? formatMoney(item.Descount_price) : formatMoney(item.Price)}
                            </p>
                            <p className={(hasDescount(item)) ? "font-bold text-gray line-through text-sm content-center" : "hidden"}>
                                {formatMoney(item.Price)}
                            </p>
                        </div>

                        <p className="text-green font-bold mt-2"> {percent(item.Price, item.Descount_price)} </p>
                    </div>

                    <p className="flex mx-4 font-bold text-gray"> ou até 12x de {formatMoney(parcel(item.Price))} </p>
                    
                </div>

                {/* PREFERENCES */}
                <div className="m-4 font-bold text-gray">
                    <div>
                        <p className="mt-2 mb-1"> Cor: <span className="font-bold">{productColor}</span></p>

                        {Object.entries(colors).map(([key, value], index) =>
                            <input type="radio" name="color" id={key} onChange={handleColor} key={index}
                            className={"appearance-none rounded-full h-5 w-5 m-1 " + value +
                                        " checked:border-2 checked:outline-1 checked:border-light checked:" + value} />
                        )}

                    </div>
                        
                    <div>
                        <p className="mt-2 mb-1"> Tamanho: <span className="font-bold">{productSize}</span></p>

                        {Object.values(size).map((size, index) =>
                            <button onClick={_ => setProductSize(size)} key={index}
                                className={ (productSize == size) ? "w-10 h-8 m-1 rounded-xl bg-dark-gray text-light cursor-pointer" :
                                    "w-10 h-8 m-1 rounded-xl border border-dark-gray cursor-pointer" } > {size}
                            </button>
                        )}
                    </div>

                </div>
                    
                <div className="flex justify-between mx-5">
                    <div>
                       <p className="mt-2 mb-1 text-gray">Quantidade</p>

                        <div className="flex h-10 w-20 rounded-lg outline justify-center font-bold">
                            <button className="outline-none cursor-pointer" onClick={subQtd}>-</button>
                                <p className="mx-4 content-center">{productQtd}</p>
                            <button className="outline-none cursor-pointer" onClick={addQtd}>+</button>
                        </div>
                        
                    </div>
                    
                    <div className="mt-3">
                        <BlackButton p_text="Adicionar a Sacola" width='30' on_click={sendPreferences}></BlackButton>
                    </div>
                </div>

                <hr className="w-95 mx-10 mt-5  bg-dark-gray rounded-sm"/>

                <div className="flex m-2 justify-center text-center">
                    <button onClick={_ => setComponent(tabs.DSC)}>
                        <p className={(component == tabs.DSC ? "m-2 underline underline-offset-4 decoration-red decoration-2 cursor-pointer" :
                                                            "m-2 hover:font-bold cursor-pointer")}>
                            Descrição
                        </p>
                    </button>

                    <button onClick={_ => setComponent(tabs.CPM)}>
                        <p className={(component == tabs.CPM ? "m-2 underline underline-offset-4 decoration-red decoration-2 cursor-pointer" :
                                                            "m-2 hover:font-bold cursor-pointer")}>
                            Composição
                        </p>
                    </button>

                    <button onClick={_ => setComponent(tabs.FRT)}>
                        <p className={(component == tabs.FRT ? "m-2 underline underline-offset-4 decoration-red decoration-2 cursor-pointer" :
                                                            "m-2 hover:font-bold cursor-pointer")}>
                            Frete
                        </p>
                    </button>

                    <button onClick={_ => setComponent(tabs.COM)}>
                        <p className={(component == tabs.COM ? "m-2 underline underline-offset-4 decoration-red decoration-2 cursor-pointer" :
                                                            "m-2 hover:font-bold cursor-pointer")}>
                            Avaliações({comments_count})
                        </p>
                    </button>
                </div>

                
                
                {/* ABAS*/}
                <div className="flex my-4 mx-10">{tabType()}
                </div>
            </div>

        </div>
    )
}