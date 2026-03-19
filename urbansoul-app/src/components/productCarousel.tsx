import { useState } from "react";
import type { ImagesInterface } from "../@types/products";

interface ProductsCarouselProps{
    images: ImagesInterface[]

}

export function ProductCarousel(data: ProductsCarouselProps){
    const [currentImg, setCurrentImg] = useState(0);
    const handleExposedImg = (index: number) => {
        setCurrentImg(index)
    }

    const itemsPerView = 4;
    const visibleImgs = data.images.slice(0, itemsPerView)

    return(
        <div className="flex">
            <ul className="m-3">
                {visibleImgs.map((image, index) =>
                    <li key={index}>
                        <button onClick={_ => handleExposedImg(index)}>
                            <img src={`/images/${image.Img_url}`} alt="Imagem de Produto"
                                className= {(index == currentImg) ? "h-35 w-25 m-1 p-2 bg-light rounded-lg cursor-pointer outline-2 outline-red" :
                                                                    "h-35 w-25 m-1 p-2 bg-light rounded-lg cursor-pointer" }/>
                            
                        </button>
                    </li>
                )}
            </ul>

            <div className="m-4">
                <img src={`/images/${data.images.at(currentImg)?.Img_url}`} alt="Imagem gigante escolhida"
                    className="m-2 bg-light h-150 w-120 p-2"/>
            </div>
        </div>
    )
}