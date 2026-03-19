import { useState, type ChangeEvent, type FormEvent } from "react";
import { OutsideClick } from "../../@utils/outsideClick";
import { BlackButton } from "../button";
import { LoginInputTextBox } from "../input";

const logo = '/logos/logo2.svg'

interface ModalLoginProps {
    closeModal: () => void;
}

export function ModalLogin(data: ModalLoginProps){
    const ref = OutsideClick(() => {
        data.closeModal()
    });

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    // enviar dados ao banco, fazer validação e trazer token
    const handleSubmit = (e: FormEvent) => {
       e.preventDefault()

       console.log(loginForm)
    }
    
    return (
        <div ref={ref} className="fixed top-1/4 right-1/4 bg-light md:w-180 md:h-80 w-150 h-60 my-5 outline-1 outline-dark-gray rounded-sm">

            <div className="flex gap-5 justify-center h-full items-center font-noto md:text-lg text-sm text-dark-gray">

                <div className="md:w-75 w-50">
                    <div className="font-bold md:text-2xl text-xl">
                        <p>BEM VINDO</p>
                        <div className="flex">
                            <p>À</p>
                            <img src={logo} alt="" className="m-1 h-10" />
                        </div>
                    </div>

                    <p>
                        <span className="font-bold">Entre </span> ou
                        <span className="font-bold"> Crie uma conta </span>
                        para aproveitar promoções e cupons exclusivos
                    </p>
                </div>

                <hr className="w-px h-2/3 bg-gray rounded-sm"/>

                <form action="" onSubmit={(e) => {handleSubmit(e)}}>
                    <p className="font-bold md:text-xl text-lg">Entre com E-mail e Senha</p>

                    <div className="my-3">

                        <LoginInputTextBox type='text' name='email' placeholder='Insira seu E-mail'
                                            value={loginForm.email} on_change={(e) => {handleChange(e)}}/>
                        
                        <LoginInputTextBox type='password' name='password' placeholder='Insira sua Senha'    
                                            value={loginForm.password} on_change={(e) => {handleChange(e)}}/>
                        
                    </div>

                    <a href="/account/create" className="md:text-base text-sm underline underline-offset-1">Não possui conta?</a>
                    
                    <div className="flex justify-center">
                        <BlackButton p_text="Login" width="w-20"></BlackButton>
                    </div>

                </form>
                
            </div>

        </div>
    )
}