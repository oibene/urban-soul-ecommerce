interface ButtonProps{
    href?: string,
    p_text: string,
    width: string,

    on_click?: () => void
}

export function BlackButton(props: ButtonProps) {
    return(
        <button onClick={props.on_click} className={props.width +" h-8 mt-4 bg-dark-gray rounded-sm content-center outline-none cursor-pointer"}>
            <p className="md:text-sm text-xs font-bold mx-4 text-light"> {props.p_text} </p>
        </button>
    )
}

export function BlackSubmitButton(props: ButtonProps) {
    return(
        <button type="submit" className={props.width +" h-8 mt-4 bg-dark-gray rounded-sm content-center outline-none cursor-pointer"}>
            <p className="md:text-sm text-xs font-bold mx-4 text-light"> {props.p_text} </p>
        </button>
    )
}


export function WhiteButton(props: ButtonProps) {
    return(
        <a href={props.href} className={"md:" + props.width + " h-8 mt-4 mr-4 outline-2 rounded-sm content-center cursor-pointer"}>
            <p className="md:text-sm text-xs font-bold mx-4 text-dark-gray"> {props.p_text} </p>
        </a>
    )
    
}