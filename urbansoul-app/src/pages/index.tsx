import { carouselFemImgs } from "../@utils/staticData"
import { Carousel } from "../components/carousel"

const banner_img = '/images/banner.svg'
const truck = '/logos/delivery_truck_speed.svg'
const credit = '/logos/credit_score.svg'
const savings = '/logos/savings.svg'

export default function Index(){
    const width = window.innerWidth;
    const items_per_view = (width >= 768) ? 4 : 2
    
    return (
        <div className="font-noto">

            {/* BANNER */}
            <div className="flex mx-10 justify-between">
                <div className="grid grid-rows-2 gap-5 self-center font-noto text-dark-gray w-2/5 text-center">
                
                    <p className="lg:text-6xl md:text-5xl text-4xl font-light italic ">NOVA COLEÇÃO PRIMAVERA VERÃO</p>
                    
                    <div>
                        <hr className="w-5/6 h-1 bg-red rounded-sm mb-4 justify-self-center"/>
                        <p className="lg:text-4xl md:text-3xl text-x1 font-bold">50% OFF</p>
                        <p className="lg:text-x1 md:text-base text-sm font-semibold">Em compras acima de R$ 200,00</p>
                    </div>
                    
                </div>
                <img src={banner_img} alt="mulher" className="w-90 md:w-150" />
            </div>


            {/* DIVISORIA */}
            <div className="bg-red text-light font-bold text-xs md:text-sm">
                <div className="flex justify-evenly mx-5 h-10 md:mx-10 md:h-20 items-center">

                    <div className="flex gap-2">
                        <img src={truck} alt="" className="w-5 h-5 md:h-8 md:w-8" />
                        <p className="my-1">Frete Rápido</p>
                    </div>
                    
                    <hr className="w-0.5 h-2/3 bg-light rounded-sm "/>

                    <div className="flex gap-2">
                        <img src={credit} alt="" className="w-5 h-5 md:h-8 md:w-8" />
                        <p className="my-1">Compra Segura</p>
                    </div>
                    
                    <hr className="w-0.5 h-2/3 bg-light rounded-sm"/>

                    <div className="flex gap-2">
                        <img src={savings} alt="" className="w-5 h-5 md:h-8 md:w-8" />
                        <p className="my-1">Economize com Cupons</p>
                    </div>
                    
                </div>
            </div>

            {/* CATEGORIAS*/}
            <Carousel items={carouselFemImgs} theme="FEMININAS" itemsPerView={items_per_view}></Carousel>

        </div>
    )
}