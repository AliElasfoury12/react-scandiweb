import  { Component } from 'react'
import Attributes from '../attributes/Attributes';
import AddToCart from './AddToCart';
import PropTypes from 'prop-types'

export default class ProductDetails extends Component { 
    static propTypes = {
        product: PropTypes.object,
    }

    state = {
        selected: {}
    }

    setSelected = (attributeId, itemId) => {
        let {selected} = this.state
        selected[attributeId] = itemId
        this.setState({selected: selected })                
    }

    resetSelected = () => {
        this.setState({selected: {}})
    }

    componentDidMount() {
        let {product} = this.props
        document.getElementById('description').innerHTML=product.description
    }

    render() {
        let {product} = this.props
        let {selected} = this.state

        let currency = product.prices.currency
        currency = JSON.parse(currency) 
               
        return ( 
            <div 
                className='flex flex-col px-3 flex-1 max-w-[30rem]'>
                <h1 className='font-bold'>
                    {product.name}
                </h1>

                <div className='max-w-44'>
                    <Attributes 
                        product={product} 
                        selected={selected} 
                        setSelected={this.setSelected}
                        testId='product-attribute-'
                    />
                </div>

                <div className='mt-4'>
                    <b className='font-robotoCondensed'>
                        PRICE:
                    </b>
                    <p className='font-bold'>
                        {currency.symbol}{product.prices.amount} 
                    </p>
                </div>

                <AddToCart
                    product={product} 
                    selected={selected}
                    resetSelected={this.resetSelected}
                />

                <div 
                    className='font-roboto'
                    data-testid='product-description' 
                    id='description'>
                </div>
            </div>
        )
    }
}