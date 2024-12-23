import { Component } from 'react'
import PropTypes from 'prop-types'
import CartCardLeft from './CartCardLeft'
import { AppContext } from '../../../context'

export default class CartCard extends Component {
    static contextType = AppContext

    static propTypes = {
       product: PropTypes.object,
    }

    state = {
        itemCount: Number(this.props.product.count)
    }

    setCount = (x, product) => {
        
        let {setCart, setItemsCount, itemsCount} = this.context
        let cart = JSON.parse(localStorage.getItem('cart'))

        let exsists = cart.find(p => Object.values(p.selected).join() == Object.values(product.selected).join()) ?? ''

        let index = cart.indexOf(exsists)

        exsists.count = this.state.itemCount + x

        if(exsists.count == 0) {
            cart = cart.filter((_, i) => i != index)
        }else {
            cart[index] = exsists
            this.setState({itemCount: this.state.itemCount + x})
        }

        setItemsCount(itemsCount + x)
        setCart(cart)
    }

    render() {
        let {itemCount} = this.state
        let {product} = this.props        
   
        return (
            <div 
                className='flex justify-between mb-10'>
                
                <div className='flex max-w-44 flex-col gap-1 px-1'>
                    <CartCardLeft product={product}/>
                </div>

               <div className='flex justify-end '>
                    <div 
                        className='flex flex-col justify-between items-center w-7 mx-2 min-h-32 '>
                        <button 
                            data-testid='cart-item-amount-increase'
                            onClick={() => this.setCount(1, product)}
                            className='border-2 px-2 border-black'>
                            +
                        </button>
                        <b 
                            data-testid='cart-item-amount'>
                            {itemCount}
                        </b>
                        <button
                            data-testid='cart-item-amount-decrease'
                            onClick={() => this.setCount(-1, product)} 
                            className='border-2 px-2 border-black'>
                            - 
                        </button>
                    </div>

                    <img 
                        className='w-24 object-contain self-start' 
                        src={product.gallery[0].img ? product.gallery[0].img : product.gallery} 
                        alt="main image" 
                    />
                </div>
            </div>
        )
    }
}