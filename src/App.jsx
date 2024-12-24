import React from "react";
import {Outlet } from "react-router-dom";
import { AppContext } from "./context";
import CartOverlay from "./components/cart/CartOverlay";
import Header from "./components/header/Header";
import ErrorPage from "./components/ErrorPage";

export default class App extends React.Component {
    state = {
        cart: JSON.parse(localStorage.getItem('cart')) ?? [],
        showCart: false,
        itemsCount: 0,
        category: '',
        hasError: false
    }

    setCart = (value) => {
        this.setState({cart: value})
        localStorage.setItem('cart', JSON.stringify(value))
    }

    setShowCart = (value) => {
        this.setState({showCart: value})
    }

    updateCartCount = () => {
        let count = 0
        this.state.cart.map((product) => count += product.count)
        this.setItemsCount(count)
    }

    setItemsCount = (value) => {
        this.setState({itemsCount: value})
    }

    setCategory = (value) => {
        this.setState({category: value})
    }

    componentDidMount () {
        localStorage.clear()
        localStorage.setItem('cart', JSON.stringify([]))
    }

    componentDidCatch (error) {
        console.log(error);
        this.setState({hasError: true})
    }
  
    render() {
        if (this.state.hasError) {
            return <ErrorPage type='error'/>
        }

        let {cart, itemsCount,  category, showCart} = this.state;
        let {setCart, setItemsCount, updateCartCount, setCategory, setShowCart} = this
        return (
            <div>
                <AppContext.Provider value={{
                    cart,
                    setCart,
                    showCart,
                    setShowCart,
                    itemsCount,
                    setItemsCount,
                    updateCartCount,
                    category,
                    setCategory
                }}>
                    <Header/>
                    {showCart ?
                        <div 
                            onClick={(e) => {                                
                                if(e.target == document.getElementById('shadow-div')) {
                                    setShowCart(false)
                                }
                            }}
                            id="shadow-div"
                            style={{background: 'rgba(57, 55, 72, 0.22)'}}
                            className='w-screen h-screen fixed left-0 top-0 z-10'>
                            <CartOverlay/>
                        </div>
                    : ''}
                   <Outlet/>
                </AppContext.Provider>
            </div>
        )
    }
}