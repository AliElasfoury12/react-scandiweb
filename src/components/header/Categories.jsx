import  { Component } from 'react'
import { Link } from "react-router-dom";
import API from '../api/API';
import { categoriesSchema } from '../api/Schema';
import { AppContext } from '../../context';
import { Router } from '../../Router';
import ErrorPage from '../ErrorPage';

export default class Categories extends Component {
    static contextType = AppContext

    state = {
        categories: []
    }

    getCategories () {
        let {setCategory} = this.context
        
        API.fetch(categoriesSchema)
        .then(res => {
            let categories = res.categories.categories
            this.setState({categories: categories})

            let pathname = Router.state.location.pathname

            if (pathname == '/') {
                setCategory(categories[0].name)
                Router.navigate(`/${categories[0].name}`)
            }else{
                let category = pathname.replace('/', '')                 
                setCategory(category)

                if (JSON.stringify(categories.find((c) => c.name == category )) || category.includes('/')) {
                    Router.navigate(pathname)
                }else {
                   Router.navigate('/notFound')
                }
            }
        })
    }

    componentDidMount() {        
        this.getCategories()
    }

    render() {
        let { categories } = this.state
        let { setCategory } = this.context

        if (categories.length == 0) {
            return <ErrorPage type='loading' />
        }

        let showCategories = categories.map((category, index) => {
            return (
                <Link 
                    data-testid={category.name == this.context.category ? 'active-category-link' : 'category-link'}
                    key={index}
                    className={
                        `${category.name == this.context.category ?
                            'border-b-2 border-[#5ECE7B] text-[#5ECE7B]' : ''} w-20 py-5 text-center` 
                    }
                    onClick={() => setCategory(category.name)} 
                    to={`/${category.name}`} >
                        {category.name.toUpperCase()}
                </Link>
            )
        })

        return (showCategories)
    }
}
