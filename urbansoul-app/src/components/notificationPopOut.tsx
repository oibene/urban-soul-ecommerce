import warning from '/logos/warning_white.svg'
import sucess from '/logos/check_white.svg'
import type { NotificationInterface } from '../@types/notification';
import { useEffect, useState } from 'react';

interface NotificationPopOutProps{
    notification: NotificationInterface
    closeNotification: () => void;
}

export function NotificationPopOut(data: NotificationPopOutProps){
    const [timeLeft, setTimeLeft] = useState(50)
    const progressWidtht = timeLeft * 2

    let countdown: number | undefined
    let stopCount: number | undefined

    useEffect(() => {

        countdown = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1)
        }, 100); // 100 milisegundos 

        stopCount = setTimeout(() => {
            data.closeNotification()
        }, 5000); // 5s


        return () => {
            clearInterval(countdown);
            clearTimeout(stopCount);
        };

    }, []); // [] -> roda só quando o componente abre
    

    if (data.notification.isError) {
        return(
            <div className="fixed bottom-2 right-2 bg-red w-100 h-20 rounded-lg">
                <div className="m-3 font-noto font-bold text-light text-sm">
                    
                    <div className="flex content-center">
                        <img src={warning} alt="Logo de Erro" />
                        <p className="text-base ml-2">ERRO!</p>
                        
                    </div>

                    <div className="mt-1 my-2">
                        <p>Ocorreu um erro ao efetuar o {data.notification.message}</p>

                        {/* PROGRESS BAR FROM SCRATCH :PPP */}
                        <div className="h-1 mt-2 bg-light opacity-80 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${progressWidtht}%` }}> </div>
                    </div>

                </div>
            </div>
        )
    }

    return(
        <div className="fixed bottom-2 right-2 bg-green w-100 h-20 rounded-lg">
            <div className="m-3 font-noto font-bold text-light text-sm">
                
                <div className="flex content-center">
                    <img src={sucess} alt="Logo de Erro" />
                    <p className="text-base ml-2">SUCESSO!</p>
                </div>
                
                
                <div className="mt-1 my-2">
                    <p>Sucesso ao efetuar o {data.notification.message}</p>

                    {/* PROGRESS BAR FROM SCRATCH :PPP */}
                    <div className="h-1 mt-2 bg-light opacity-80 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progressWidtht}%` }}> </div>
                </div>
                
            </div>
        
        </div>
    )
}