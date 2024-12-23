import  { Component } from 'react'
import { AppContext } from '../../context'
import PropTypes from 'prop-types'
import { addToCart } from '../addToCart'

export default class AddToCart extends Component { 
    static contextType = AppContext

    static propTypes = {
        product: PropTypes.object,
        selected: PropTypes.object,
    }

    render() {
        let {setShowCart} = this.context
        let {product, selected} = this.props
        let chosse = Object.keys(selected).length == product.attributes.length
                
        return ( 
            <button 
                data-testid='add-to-cart'
                disabled={chosse ? false : true}
                onClick={
                    () => {
                        if(chosse && product.inStock == 1){
                            addToCart(product, this.context, selected)
                            setShowCart(true)
                        }
                    }
                }
                className={
                    `${chosse && product.inStock == 1 ?
                    'bg-green-400' :
                    'bg-gray-400 cursor-not-allowed'}
                    text-white my-4 h-8 font-bold`}>
                ADD TO CART
            </button>
        )
    }
}
