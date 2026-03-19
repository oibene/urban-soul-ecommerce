const call = '/logos/call.svg'
const svg_email = '/logos/3p.svg'

export function Footer() {
    return (
        <div className="bg-dark-gray w-full h-50">
            <div className="flex md:mx-10 mx-5 justify-between font-noto text-light">

                <div className="mt-5">
                    <p className="text-base font-bold"> Sobre a Urban Soul</p>
                    <p className="mt-5 text-xs md:w-50 w-40">Conectar pessoas ao estilo urbano com roupas confortáveis e cheias de personalidade,
                        oferecendo uma experiência online prática que valoriza a diversidade e a autenticidade.</p>
                </div>

                <div className="mt-5">
                    <p className="text-base font-bold">Suporte</p>
                    <div className="grid grid-rows-4 gap-2 mt-5">
                        <a href="#" className="text-xs w-50 hover:underline">Politica de Privacidade e Segurança</a>
                        <a href="#" className="text-xs w-50 hover:underline">Termos e Condições de Uso</a>
                        <a href="#" className="text-xs w-50 hover:underline">SAC</a>
                        <a href="#" className="text-xs w-50 hover:underline">Relatar um Problema</a>
                    </div>
                </div>

                <div className="mt-5">
                    <div>
                        <p className="text-base font-bold"> Contato</p>
                        <div className="grid grid-rows-2 gap-2 mt-5">
                            
                            <div className="flex">
                                <img src={call} alt="" />
                                <a href="#" className="ml-2 text-xs w-50 hover:underline"> (XX) 99999 - 9999</a>
                            </div>

                            <div className="flex">
                                <img src={svg_email} alt="" />
                                <a href="#" className="ml-2 text-xs w-50 hover:underline">urbansoulsac@email.com</a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="text-base font-bold"> Certificados</p>
                    </div>
                </div>
                
            </div>

        </div>
    )
}