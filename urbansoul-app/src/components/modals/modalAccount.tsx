import type { AccountInterface } from "../../@types/customer";
import { OutsideClick } from "../../@utils/outsideClick";

const person = "/logos/person.svg"

interface ModalAccProps {
    account:AccountInterface;
    closeModal: () => void;
}

export function ModalAccount(data:ModalAccProps){
    const ref = OutsideClick(() => {
        data.closeModal()
    });

    return(
        <div ref={ref} className="fixed top-1/8 right-2 bg-dark-gray w-70 h-52">
            <div className="font-noto font-bold text-light-gray text-sm">

                <div className="m-3">
                    <p>CONTA</p>

                    <div className="flex mt-2 content-center ">
                        <div className="flex h-14 w-14 justify-center rounded-full bg-light-gray">
                            <img src={person} alt="" />
                        </div>
                        <div className="ml-3 text-xs content-center">
                            <p>{data.account.first_name + " " + data.account.last_name}</p>
                            <p className="font-normal">{data.account.email}</p>
                        </div>
                    </div>
                </div>
               
                <hr className="w-full h-0.5 rounded-sm"/>

                <div className="cursor-pointer m-3">
                    <a href="/account/edit">
                        ALTERAR CONTA
                    </a>
                </div>
                
                <hr className="w-full h-0.5 rounded-sm"/>

                <button className="m-3 cursor-pointer">
                    LOGOUT
                </button>
            </div>

        </div>
    )
}