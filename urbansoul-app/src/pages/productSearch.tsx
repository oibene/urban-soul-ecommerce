import { useState } from 'react'

import { ListCategories, ListProducts } from '../@api/connectProduct';
import { formatMoney, GetImgOrErrorImg, hasDescount, percent } from "../@utils/formats"
import { gender, size } from '../@utils/staticData';

import type { CategoryInterface, ItemsFilterInterface, ItemsInterface } from "../@types/products"

import filter_svg from '/logos/discover_tune.svg'
import arrow_down from '/logos/arrow_down.svg'
import arrow_up from '/logos/arrow_up.svg'

const getFilter : ItemsFilterInterface = {
        size: [],
        gender: [],
        category: [],
        min_price: 0,
        max_price: 0
}

export default function ProductSearch() {
    //const { product } = useParams();

    const items: ItemsInterface[] = ListProducts()
    const categories: CategoryInterface[] = ListCategories()

    //#region COLLAPSES
        const [genderCollapse, setGenderCollapse] = useState(true);
        const [categoryCollapse, setCategoryCollapse] = useState(true);
        const [sizeCollapse, setSizeCollapse] = useState(true);
        const [priceCollapse, setPriceCollapse] = useState(true);
    
        const handleGender = () => {
            setGenderCollapse(!genderCollapse)
        }
        const handleCategory = () => {
            setCategoryCollapse(!categoryCollapse)
        }
        const handleSize = () => {
            setSizeCollapse(!sizeCollapse)
        }
        const handlePrice = () => {
            setPriceCollapse(!priceCollapse)
        }
    //#endregion
    
    const [filters, setFilters] = useState(Object)
    console.log(filters)

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);

    //#region HANDLERS
    const handleMinPrice = (value: string) => {
        setMinValue(parseInt(value))
        getFilter.min_price = Math.max(0, Math.min(9999, minValue))

        setFilters(getFilter)
    }

    const handleMaxPrice = (value: string) => {
        setMaxValue(parseInt(value))
        getFilter.max_price = Math.max(0, Math.min(9999, maxValue))
        
        setFilters(getFilter)
    }

    const handleChecks = () => {
        const checkboxSize = document.getElementsByName('size') as NodeListOf<HTMLInputElement>;
        const checkboxGender = document.getElementsByName('gender') as NodeListOf<HTMLInputElement>;
        const checkboxCategory = document.getElementsByName('category') as NodeListOf<HTMLInputElement>;

        getFilter.size = Array.from(checkboxSize).map(checkbox => (checkbox.checked) ? checkbox.id : "");
        getFilter.gender = Array.from(checkboxGender).map(checkbox => (checkbox.checked) ? checkbox.id : "");
        getFilter.category = Array.from(checkboxCategory).map(checkbox => (checkbox.checked) ? checkbox.id : "");

        setFilters(getFilter)
    }

    const handleCollapse = (collapse: boolean) => {
        const img = (collapse) ? arrow_up: arrow_down;
        const hrStyle = (collapse) ? "mt-2 w-full rounded-sm  text-gray": "mt-2 w-full rounded-sm"
        return {img, hrStyle}
    }
    //#endregion

    const checkboxStyle: string = ("appearance-none rounded-sm h-4 w-4 border border-gray" +
                                        " checked:border-2 checked:outline-1 checked:border-light checked:bg-dark-gray");

    return(
        <div className="flex m-10">

            {/* FILTROS */}
            <div className="w-75 h-150 mt-5 bg-light rounded-sm">
                <div className="m-5 font-noto text-dark-gray text-base">

                    <div className="flex">
                        <img className="mr-1" src={filter_svg} alt="" />
                        <p>Filtros</p>
                    </div>
                    <hr className="mt-2 w-full rounded-sm" />

                    <div className="mt-2">
                        <button className="flex justify-between w-full cursor-pointer outline-none" onClick={handleGender}>
                            <p>Gênero</p>
                            <img src={handleCollapse(genderCollapse).img} alt="" />
                        </button>

                        <ul className={genderCollapse ? "text-sm mt-1" : "hidden "}>
                            {Object.entries(gender).map(([key, value], index) =>
                                <li className="flex mb-1 cursor-pointer" key={index}>
                                    <input type="checkbox" name="gender" id={key} onClick={handleChecks} className={checkboxStyle} />
                                    <p className="ml-2 content-center">{value}</p>
                                </li>
                            )}
                        </ul>

                        <hr className={handleCollapse(genderCollapse).hrStyle} />
                    </div>

                    <div className="mt-2">

                        <button className="flex justify-between w-full cursor-pointer outline-none" onClick={handleCategory}>
                            <p>Categoria</p>
                            <img src={handleCollapse(categoryCollapse).img} alt="" />
                        </button>

                        <ul className={categoryCollapse ? "text-sm mt-1" : "hidden "}>
                            {categories.map((item, index) =>(
                                <li key={index} className="flex mb-1 cursor-pointer">
                                    <input type="checkbox" name="category" id={item.Category_code.toString()}
                                            onChange={handleChecks} className={checkboxStyle}/>
                                    <p className="ml-2 content-center">{item.Description}</p>
                                </li>
                            ))}
                        </ul>
                        <hr className={handleCollapse(categoryCollapse).hrStyle} />
                    </div>
                            

                    <div className="mt-2">
                        <button className="flex justify-between w-full cursor-pointer outline-none" onClick={handleSize}>
                            <p>Tamanho</p>
                            <img src={handleCollapse(sizeCollapse).img} alt="" />
                        </button>

                        <ul className={sizeCollapse ? "text-sm mt-1" : "hidden "}>

                            {Object.values(size).map((value, index) =>
                                <li className="flex mb-1 cursor-pointer" key={index}>
                                    <input type="checkbox" name="size" id={value} onClick={handleChecks} className={checkboxStyle} />
                                    <p className="ml-2 content-center">{value}</p>
                                </li>
                            )}
                        </ul>
                        <hr className={handleCollapse(sizeCollapse).hrStyle} />
                    </div>

                    <div className="mt-2">
                        <button className="flex justify-between w-full cursor-pointer outline-none" onClick={handlePrice}>
                            <p>Preço</p>
                            <img src={handleCollapse(priceCollapse).img} alt="" />
                        </button>

                        <div className={priceCollapse ? "flex text-sm mt-3 mx-2 justify-evenly" : "hidden "}>

                            <p className="content-center">De</p>

                            <div className="outline-1 mr-4 rounded-xs text-gray h-8 w-1/3 content-center">
                                <input type="number" className="ml-2 text-base text-dark-gray outline-none w-20"
                                    name="price" min={0} max={9999}
                                    value={Math.max(0, Math.min(9999, minValue))}
                                    onChange={(e) => { handleMinPrice(e.target.value)}} />
                            </div>

                            <p className="content-center">Até</p>

                            <div className="outline-1 rounded-xs text-gray h-8 w-1/3 content-center">
                                <input type="number" className="ml-2 text-base text-dark-gray outline-none w-18"
                                    name="price" min={0} max={9999}
                                    value={Math.max(0, Math.min(9999, maxValue))}
                                    onChange={(e) => { handleMaxPrice(e.target.value)}} />
                            </div>
                        </div>
                        <hr className={handleCollapse(priceCollapse).hrStyle} />
                    </div>

                </div>
            </div>
            
            <div className="w-full bg-light ml-10 rounded-sm">

                <div className="bg-bglight h-10 m-5">
                    {/* TODO: SISTEMA DE FILTROS DE ORDENAÇÃO E EXIBIR FILTROS USADOS*/}

                </div>

                <ul className="md:grid lg:grid-cols-6 md:grid-cols-3 mx-5 overflow-y-auto h-150">
                    {items != undefined && items.map((item, index) => 
                    <li className="m-2" key={index}>

                        <a href={"/product/"+item.Product_id}>
                            <div className="bg-bglight rounded-md lg:h-75 md:h-65 h-78">
                                <img src={GetImgOrErrorImg(item)} alt="" className="lg:w-60 lg:h-50 md:w-50 md:h-35 w-60 h-50 p-2" />

                                <div className="mt-2 font-noto text-dark-gray text-sm p-2">
                                    <p>{item.Product_name}</p>
                                    
                                    <div className="lg:flex">
                                        <p className={(hasDescount(item))? "font-bold content-center" : "hidden"}>
                                            {formatMoney(item.Descount_price)}
                                        </p>
                                        <p className={(hasDescount(item))? "lg:ml-2 content-center text-gray text-xs line-through font-bold"
                                            : "content-center font-bold"}>
                                            {formatMoney(item.Price)}
                                        </p>
                                            
                                    </div>

                                    <p className={(hasDescount(item))? "content-center font-bold text-xs text-green" : "hidden"}>
                                            {percent(item.Price, item.Descount_price)}
                                    </p>

                                </div>
                            </div>
                        </a>

                    </li>)}
                </ul>

            </div>
            
        </div>
    )
}