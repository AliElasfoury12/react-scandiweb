import  { Component } from 'react'
import brandIcon from '../../assets/Brand icon.svg'
import EmptyCart from '../../assets/Empty Cart.svg'
import { AppContext } from '../../context';
import Categories from './Categories';

export default class Header extends Component {
    static contextType = AppContext

    state = {
        categories: [],
    }

    setLoading = (value) => {
        this.setState({loading: value})
    }

    render() {
        let {itemsCount, showCart, setShowCart} = this.context

        return (
            <header
                className="flex justify-between items-center fixed top-0 w-full px-6  z-20 bg-white h-16">

                <nav 
                    style={{flex:'1'}}
                    className="flex gap-6 h-14 items-center max-[600px]:text-xs">
                    <Categories setLoading={this.setLoading} />
                </nav>
                
                <div
                    className='flex justify-center max-[400px]:hidden'
                    style={{flex:'1'}}>
                    <img src={brandIcon} alt="Brand icon" />
                </div>
            
                <div  style={{flex:'1'}} className='relative flex justify-end'>
                    {itemsCount > 0 ?  
                        <small
                            aria-label='Cart Button Count Bubble'
                            className='bg-black text-white text-center rounded-full absolute min-w-5 h-5 -right-2 -top-2 z-10'>
                            {itemsCount}
                        </small>  
                    : ''}

                    <button 
                        data-testid='cart-btn'
                        onClick={() => setShowCart(!showCart)}
                        className='w-6 h-6 bg-no-repeat relative'>
                        <img src={EmptyCart} alt="Empty Cart" />
                    </button>
                </div>
            </header>
        )
    }
}
