import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Page from "./components/products/Page";
import ProductPage from "./components/product/ProductPage";

export let Router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children : [
            {
                path: ':category',
                element: <Page/>,
            },
            {
                path: ':category/:id',
                element: <ProductPage/>,
            }
        ]
    }
])
