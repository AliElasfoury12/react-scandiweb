import  { Component } from 'react'
import CartCard from './CartCard /CartCard'
import { AppContext } from '../../context'
import PlaceOrder from './PlaceOrder'

export default class CartOverlay extends Component {
    static contextType = AppContext

    render() {
        let {cart, itemsCount} = this.context
        let total = 0
        let symbol
        if(cart.length) {
            let currency = cart[0].prices.currency
            currency = JSON.parse(currency ) 
            symbol = currency.symbol
        }
        
        let showCartItems = cart.map((product, index) => {
            total += Number(product.prices.amount) * product.count
            return <CartCard key={index} product={product}/>
        })

        return (
            <div
                className='absolute bg-white p-4 w-[23rem] right-0 z-10 top-16 overflow-y-scroll max-h-[90%]'>

                <p>
                    <span className='font-bold'> My Bag,</span> {' ' + itemsCount}
                    {itemsCount > 1 ? ' items' : ' item'}
                </p>

                <div className='mt-4'>
                    {showCartItems}
                </div>

                <div  className='w-full flex justify-between my-6 font-bold' >
                    <p className='font-roboto'>Total</p>
                    <p data-testid='cart-total'>
                        {total == 0 ? 0 : symbol + total.toFixed(2)}
                    </p>
                </div>

                <PlaceOrder/>
            </div>                                  
        )
    }
}