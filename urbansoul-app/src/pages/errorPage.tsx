const warning = '/logos/warning.svg'

export default function ErrorPage(){
    return(
        <div className="h-147">
            <div className="font-noto text-dark-gray m-10">
                <div className="flex">
                    <img src={warning} alt="erro" />
                    <p className="ml-2 font-bold text-base">Pagina Não Encontrado</p>
                </div>
                        
                <div className="flex mt-5">
                    <p>Parece que a pagina buscada não existe. Clique aqui para voltar a </p>
                    <a href="/" className="font-bold ml-1">home page</a>
                </div>
            </div>

        </div>
    )
}

export function ProductNotFound(){
    return (
        <div className="h-141">
            <div className="font-noto text-dark-gray m-10">
                <div className="flex">
                    <img src={warning} alt="erro" />
                    <p className="ml-2 font-bold text-base">Item Não Encontrado</p>
                </div>
                        
                <div className="flex mt-5">
                    <p>Parece que o item buscado não existe. Clique aqui para voltar a </p>
                    <a href="/" className="font-bold ml-1">home page</a>
                </div>
            </div>
        </div>
    )
}