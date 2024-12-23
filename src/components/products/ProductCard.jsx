import  { Component } from 'react'
import PropTypes from 'prop-types'
import cartIcon from '../../assets/Circle Icon.svg'
import {Link} from 'react-router-dom'
import { AppContext } from '../../context'
import { addToCart } from '../addToCart'
import { kebab } from '../utils/kebab'

export default class ProductCard extends Component {
    static contextType = AppContext

    static propTypes = {
        product: PropTypes.object,
    }
    
    render() {
        let {product} = this.props
        let { category } = this.context
        let currency = product.prices.currency
        currency = JSON.parse(currency) 
        let inStock = product.inStock == 1

        return (
           <article  
                className='group relative hover:shadow-md p-4 '>

                    <Link
                        data-testid={`product-${kebab(product.name)}`} 
                        to={`/${category}/${product.id}`}>

                        <div className={`${inStock ? '' : 'grayscale opacity-70'} relative flex justify-center`}>
                            <img 
                                className='h-96 object-contain' 
                                src={product.gallery} 
                                alt="product-image" />
                            {inStock ? '' : 
                                <p
                                    className='absolute text-gray-500 top-1/2 text-2xl'>
                                    OUT OF STOCK
                                </p>
                            }
                        </div> 

                       <div className='my-[10%] text-xl'>
                            <p >
                                {product.name}
                            </p>
                            <b className={inStock ? '' : 'text-gray-500'}>
                                {currency.symbol}{product.prices.amount} 
                            </b>
                       </div>
                    </Link>

                    {inStock ?
                        <button 
                            className='absolute right-6 bottom-[6.5rem] w-14 h-14 hidden group-hover:block' 
                            onClick={() => addToCart(product, this.context)}>
                                <img src={cartIcon} alt="Quick Shop" />
                        </button>
                    : ''}
           </article>
        )
    }
}
