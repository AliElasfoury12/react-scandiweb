import  { Component } from 'react'
import { AppContext } from '../../context'
import API from '../api/API'
import { orderMutation } from '../api/Schema'

export default class PlaceOrder extends Component {
    static contextType = AppContext

    placeOrder = () => {
        let {cart, setCart, setItemsCount} = this.context
        

        let order = cart.map((product) => {
            let p = {}
            p.product_id = product.id
            p.quantity = product.count
            p.attributes = JSON.stringify(product.selected)

            return p
        })
       
        API.fetch(orderMutation, {products: order})
        setItemsCount(0)
        setCart([])
    }

    render() {
        let {itemsCount} = this.context
        return (
            <button
                disabled={itemsCount > 0 ? false : true}
                onClick={() => itemsCount > 0 ? this.placeOrder() : ''} 
                className={
                    `text-white mt-2 w-full h-8 font-bold
                    ${itemsCount > 0 ? 'bg-green-400' : 'bg-gray-500 cursor-not-allowed'}`
                }>
                PLACE ORDER
            </button>
        )
    }
}