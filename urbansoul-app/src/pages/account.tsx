import { useParams } from 'react-router-dom';
import { BigInputTextBox, InputTextBox } from '../components/input';
import { BlackSubmitButton, WhiteButton } from '../components/button';
import { useState, type ChangeEvent } from 'react';
import { PostCustomerAccount } from '../@api/connectCustomers';
import type { AccountInterface } from '../@types/customer';
import { validateAccountForm } from '../@utils/validation';

const add_photo = '/logos/add_photo.svg'
const person = '/logos/person_big.svg'

export default function Account() {
    const { variant } = useParams();

    // EDIT trazer dados do banco validados pelo token
    const [accountForm, setAccountForm] = useState<AccountInterface>({
        name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const [errors, setErrors] = useState<AccountInterface>({})

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setAccountForm({
            ...accountForm,
            [name]: value
        })
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const validateErrors = validateAccountForm(accountForm)
        setErrors(validateErrors)

        if (Object.keys(validateErrors).length == 0)
            PostCustomerAccount(accountForm)
    }
    
    return(
       <div className="md:w-250 w-150 h-145 m-10 bg-light">
            <div className="m-4 content-center">

                <div className="m-10 font-noto text-dark-gray md:text-sm text-xs">

                    <div>
                        <p className="md:text-xl text-lg font-bold">
                            {(variant == 'create') ? 'Crie Sua Conta' : 'Sua Conta'}
                        </p>

                        <p className={(variant == 'create') ? "text-xs mt-2" : "hidden"}>
                            Crie sua conta e aproveite nossas promoções e cupons exclusivos
                        </p>
                    </div>

                    <form action="" onSubmit={e => handleSubmit(e)}>
                        <div className="flex my-10">
                            <div className="grid grid-cols-2 gap-4">

                                <InputTextBox type='text' name='name' p_name='Nome' error={errors.name} 
                                                value={accountForm.name} on_change={(e) => {handleChange(e)}}/>

                                <InputTextBox type='text' name='last_name' p_name='Sobrenome' error={errors.last_name}
                                                value={accountForm.last_name} on_change={(e) => {handleChange(e)}}/>

                                <BigInputTextBox type='text' name='email' p_name='E-mail' error={errors.email}
                                                value={accountForm.email} on_change={(e) => {handleChange(e)}}/>

                                <InputTextBox type='password' name='password' p_name='Senha' error={errors.password}
                                                value={accountForm.password} on_change={(e) => {handleChange(e)}}/>

                                <InputTextBox type='password' name='confirm_password' p_name='Confirme Senha' error={errors.confirm_password}
                                                value={accountForm.confirm_password} on_change={(e) => {handleChange(e)}}/>

                            </div>

                            <div className={(variant == 'create') ? "hidden" : "md:ml-15 ml-8 mt-5 w-35 "}>

                                <div className="w-35 h-35 rounded-lg outline-2 text-gray">
                                    <img className="m-2" src={person} alt="" />
                                </div>

                                <a className="flex mt-2" href="#">
                                    <img src={add_photo} alt="" />
                                    <p className="ml-2 text-xm">
                                        adicionar uma foto
                                    </p>
                                </a>
                            </div>
                        </div>

                        <div className="flex justify-between w-125">
                            <div className={(variant == 'create') ? "w-60" : "hidden"}>
                                <p>Ao clicar em Continuar você concorda com nossos
                                <a href="#" className="font-bold underline mx-1">Termos de Uso</a>
                                e
                                <a href="#" className="font-bold underline mx-1">Politica de Privacidade.</a>
                                </p>
                            </div>

                            <div className="flex">

                                {(variant == 'edit') && <WhiteButton p_text='Cancelar' width='w-25' href='/'/>}
                                <BlackSubmitButton p_text='Continuar' width='w-25'/>
                            </div>
                            
                        </div>

                    </form>
                    
                </div>
            </div>
        </div>
    )
}