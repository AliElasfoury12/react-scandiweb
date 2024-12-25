import  { Component } from 'react'
import API from '../api/API';
import { productSchema } from '../api/Schema';
import { AppContext } from '../../context'
import Gallery from './Gallery';
import ProductDetails from './ProductDetails';
import { Router } from '../../Router';
import ErrorPage from '../ErrorPage';

export default class ProductPage extends Component { 
    static contextType = AppContext

    state = {
        product: {},
        loading: true,
    }

    fetchProduct (id, fav = []) {
        API.fetch(productSchema(id))
        .then(res => {
            this.setState({product: res.product[0]})
            fav.push(res.product[0])
            this.setState({loading: false})
            localStorage.setItem('fav', JSON.stringify(fav))
        }) 
    }

    getProduct() {
        let {id} = Router.state.matches[0].params

        let fav = localStorage.getItem('fav')
        if(fav) {
            fav = JSON.parse(fav)
            let exists = fav.find((product) => product.id == id)
            if(exists) {
                this.setState({product: exists})
                this.setState({loading: false})
            }else{
              this.fetchProduct(id, fav)
            }
        }else{
            this.fetchProduct(id)
        }

    }

    componentDidMount () {
        let {cart, setItemsCount} = this.context
        if(cart.length) {
            let count = 0
            cart.map(product => count += product.count )
            setItemsCount(count)
        }
        this.getProduct()
    }

    render() {
        let {product, loading} = this.state
    
        if(loading) { return <ErrorPage type='loading'/> }

        return ( 
            <main className='flex-wrap flex mt-28 gap-10'>
                <Gallery product={product}/>
                <ProductDetails product={product} />
            </main> 
        )
    }
}