
export let  addToCart = (product, context, selected = '') => {
    
    let { setCart, setItemsCount, itemsCount} = context

    if(selected) {        
        product.selected = selected
    }else{
        selected = {}

        product.attributes.map((attribute) => {
            selected[attribute.id] = attribute.items[0].id
        })

        product.selected = selected
    }


    let cart = JSON.parse(localStorage.getItem('cart'))
    
    let exsists = cart.find(p => Object.values(p.selected).join() == Object.values(selected).join()) ?? ''

    if(Object.values(exsists).join()) {
        let index = cart.indexOf(exsists)
        exsists.count += 1
        cart[index] = exsists
    }else {
        product.count = 1
        cart.unshift(product)
    }

    setCart(cart)
    setItemsCount(itemsCount + 1)
}