import {IConfirmation, IProduct} from '../../types'

export const ConfirmationEmail = (input: IConfirmation) => {
    const productsList = (product: IProduct) => {
        return `
        ${product.title}
        ${product.id}
        ${product.quantity}
        ${product.price}
        
        `
    }

}