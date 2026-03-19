import type { ChangeEvent } from "react"

interface InputTextBoxProps{
    p_name?: string,
    type: string,
    name: string,
    placeholder?: string,

    error?: string,

    value?: string,
    on_change?: (event: ChangeEvent<HTMLInputElement>) => void
}

export function InputTextBox(props: InputTextBoxProps) {
    return(
        <div className="font-noto text-dark-gray md:text-sm text-xs">
            <p className="my-2">{props.p_name}</p>

            <div className="outline-1 rounded-xs text-gray h-8 content-center">
                <input type={props.type} name={props.name} value={props.value} onChange={props.on_change}
                        className="mx-2 md:text-base text-sm text-dark-gray md:w-70 w-50 outline-none"/>
            </div>

            {props.error && <p className="mt-1 text-red">{props.error}</p>}
        </div>
    )
}

export function BigInputTextBox(props: InputTextBoxProps) {
    return(
        <div className="col-span-2 font-noto text-dark-gray md:text-sm text-xs">
            <p className="mb-2">{props.p_name}</p>
            
            <div className="outline-1 rounded-xs text-gray h-8 content-center">
                <input type={props.type} name={props.name} value={props.value} onChange={props.on_change}
                        className="mx-2 text-base text-dark-gray md:w-145 w-90 outline-none"/>
            </div>

            {props.error && <p className="mt-1 text-red">{props.error}</p>}
        </div>
    )
}

export function LoginInputTextBox(props: InputTextBoxProps){
    return(
        <div className="outline-1 rounded-xs text-gray mb-3 h-8 content-center">
            <input type={props.type} className="ml-2 md:text-base text-sm text-dark-gray outline-none"
                    name={props.name} placeholder={props.placeholder} size={12}
                    value={props.value} onChange={props.on_change}/>
        </div>

    )
}
