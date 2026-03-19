'use client'
import { useState } from "react";
import type { CarouselInterface } from "../@types/products";

interface CarouselProps {
    items: CarouselInterface[];
    theme: string;
    itemsPerView: number;
}

export function Carousel(data: CarouselProps) {
    let [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex( () =>
            currentIndex === data.items.length -1 ? 0: currentIndex + 1
        );
    };
    const prevSlide = () => {
        setCurrentIndex( () =>
            currentIndex === 0 ? data.items.length -1 : currentIndex - 1
        );
    };

    const visibleItems = data.items.concat(data.items.slice(0, data.itemsPerView)).slice(currentIndex, currentIndex + data.itemsPerView)

    return (
        <div className="m-10">
            <div className="flex justify-center font-noto text-dark-gray mb-4">
                <p className="text-base font-bold"> MELHORES ESCOLHAS {data.theme} </p>
            </div>
            
            <div className="flex justify-center">
                <button onClick={prevSlide} className="md:rounded-full md:outline-1
                                                        md:h-7 md:px-2 md:my-30 lg:h-8 lg:px-3
                                                        text-xl font-bold cursor-pointer px-8">
                    &lt;
                </button>

                <div className="flex
                                md:w-250 md:h-110 md:gap-10
                                w-100 h-100 gap-2">

                    {visibleItems.map((item:any, index:number) => (
                        <a key={index} href={"/search/" + item.type}
                            className="transform hover:scale-105 m-2 ease-in-out">
                            <img src={item.img_URL} alt="" />
                            <div className="font-noto text-dark-gray mt-2">
                                <p className="font-bold text-base">{item.category}</p>
                                <p className="text-sm">{item.type}</p>
                            </div>
                        </a>
                    ))}
                </div>
                
                <button onClick={nextSlide} className="md:rounded-full md:outline-1
                                                        md:h-7 md:px-2 md:my-30 lg:h-8 lg:px-3
                                                        text-xl font-bold cursor-pointer px-8">
                    &gt;
                </button>
            </div>


            <div className="flex justify-center">

                {data.items.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)}
                            className={index === currentIndex ? "h-3 w-3 mx-1 outline rounded-full bg-dark-gray cursor-pointer" :
                                                                "h-3 w-3 mx-1 outline rounded-full cursor-pointer"}>
                    </button>
                ))}
            </div>
            
        </div>
    )
}