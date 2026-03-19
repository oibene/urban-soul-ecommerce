import type { ItemsInterface } from "../@types/products"

export const AddBagItemsStore = (bagItems: ItemsInterface[]) => {
    const bagItemsJSON = JSON.stringify(bagItems)

    const recoveredBagItemsJSON = localStorage.getItem('bagItems')
    if (recoveredBagItemsJSON != undefined) {

        const recoveredBagItems = JSON.parse(recoveredBagItemsJSON)
        const concatBagItemsJSON = JSON.stringify(recoveredBagItems.concat(bagItems))

        localStorage.setItem('bagItems', concatBagItemsJSON)
    }
    else{
        if (bagItemsJSON != undefined){
            localStorage.setItem('bagItems', bagItemsJSON)
        }
    }
}

export const UpdateBagItemsStore = (bagItems: ItemsInterface[]) => {
    const updateBagItemsJSON = JSON.stringify(bagItems)
    if (updateBagItemsJSON != undefined)
        localStorage.setItem('bagItems', updateBagItemsJSON)
}

export const getBagItemsStore = () => {
    const recoveredBagItems = localStorage.getItem('bagItems')

    if (recoveredBagItems != undefined)
        return JSON.parse(recoveredBagItems)

    return []
}

