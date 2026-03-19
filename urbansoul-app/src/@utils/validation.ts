import type { AccountInterface } from "../@types/customer";

export const validateAccountForm = (account: AccountInterface) => {
    const newErrors: Record<string,string> = {}
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/

    if (!account.name)
        newErrors.name = "Campo Nome deve estar preenchido!"
    if (!account.last_name)
        newErrors.last_name = "Campo Sobrenome deve estar preenchido!"

    if (!account.email || emailRegex.test(account.email))
        newErrors.email = "Campo E-mail deve ser válido!"

    if (!account.password || account.password.length < 8 )
        newErrors.password = "Senha deve ser maior que 8 caracteres!"

    if (account.confirm_password != account.password)
        newErrors.confirm_password = "Senhas devem ser compatíveis"

    return newErrors
}