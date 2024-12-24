import  { Component } from 'react'
import API from '../api/API';
import ProductCard from './ProductCard';
import { productsSchema } from '../api/Schema';
import { AppContext } from '../../context';
import './products.css'

export default class Page extends Component {
    static contextType = AppContext

    state = {
        products: [],
        loading: true
    }

    setProducts = (value) => {
        this.setState(prev => prev.products = value)
    }

    getProducts () {
        let exixts = localStorage.getItem('products')
        if(exixts) {
            this.setProducts(JSON.parse(exixts))
            this.setState({loading: false})
        }else{
            API.fetch(productsSchema)
            .then(res => {
                this.setProducts(res.products)
                localStorage.setItem('products', JSON.stringify(res.products)) 
                this.setState({loading: false})
            }); 
        }
    }

    componentDidMount () {
       this.getProducts()
    }
    
    render() { 
        let {products, loading} = this.state
        let {category} = this.context

        if(loading){return <h1>Loading...</h1> }

        let showProducts = products.map((product, index) => {            
            if(product.category == category || category == 'all') {
                return (
                    <ProductCard key={index} product={product}/>
                )
            }
        })

        return (
            <main className='w-full flex flex-col items-center gap-4 mt-32 px-6'>
                <h1 
                    className='font-bold text-xl self-start'>
                    {category ? category[0].toUpperCase() + category.slice(1) : ''}
                </h1>
                <div className='products'>
                    {showProducts}
                </div>
            </main>
        )
    }
}
