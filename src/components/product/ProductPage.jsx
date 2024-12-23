import  { Component } from 'react'
import API from '../api/API';
import { productSchema } from '../api/Schema';
import { AppContext } from '../../context'
import Gallery from './Gallery';
import ProductDetails from './ProductDetails';
import { Router } from '../../Router';

export default class ProductPage extends Component { 
    static contextType = AppContext

    state = {
        product: {},
        loading: true,
    }

    getProduct() {
        let {id} = Router.state.matches[0].params
        
        API.fetch(productSchema(id))
        .then(res => {
            this.setState({product: res.product[0]})
            this.setState({loading: false})
        }) 
    }

    componentDidMount () {
        let {cart, setItemsCount} = this.context
        let count = 0
        cart.map(product => count += product.count )
        setItemsCount(count)
        this.getProduct()
    }

    render() {
        let {product, loading} = this.state
    
        if(loading){return ''}

        return ( 
            <main className='flex-wrap flex mt-28 mb-4'>
                <Gallery product={product}/>
                <ProductDetails product={product} />
            </main> 
        )
    }
}