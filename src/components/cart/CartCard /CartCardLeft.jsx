import { Component } from 'react'
import PropTypes from 'prop-types'
import Attributes from '../../attributes/Attributes'

export default class CartCardLeft extends Component {

    static propTypes = {
        product: PropTypes.object
    }

    render() {
        let {product} = this.props
        let currency = product.prices.currency
        currency = JSON.parse(currency) 
      
        return (
            <>
                <p>{product.name}</p>
                <b className='w-fit'>{currency.symbol}{product.prices.amount}</b>
                <Attributes
                    product={product} 
                    selected={product.selected} 
                    testId='cart-item-attribute-'
                />
            </>
        )
    }
}
