export const categoriesSchema =`{
    categories{
       categories{
            name
       }
    }
}`;

export const productsSchema =`{
    products {
        id
        name
        inStock
        category
        gallery 
        attributes {
            id
            type
            items{
                id
                value
            }
        }
        prices {
            amount
            currency
        }
    }
}`;

export const productSchema = (id) => `{
    product (id: "${id}"){
        id
        name
        inStock
        description
        gallery {
            img
        }
        prices {
            amount
            currency
        }
        attributes {
            id
            type
            items{
                id
                value
            }
        }
    }
}`;

export const orderMutation =  
`mutation ($products: [OrderItemInput!]!) {
    order (products: $products) {
        id
        products {
            product_id
            attributes
            quantity
        }
    }
}`;
