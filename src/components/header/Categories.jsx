import  { Component } from 'react'
import { Link } from "react-router-dom";
import API from '../api/API';
import { categoriesSchema } from '../api/Schema';
import { AppContext } from '../../context';
import { Router } from '../../Router';

export default class Categories extends Component {
    static contextType = AppContext

    state = {
        categories: []
    }

    getCategories () {
        let {setCategory} = this.context

        API.fetch(categoriesSchema)
        .then(res => {
            this.setState({categories: res.categories.categories})

            if (Router.state.location.pathname == '/') {
                setCategory(res.categories.categories[0].name)
                Router.navigate(`/${res.categories.categories[0].name}`)
            }else{
                setCategory(Router.state.location.pathname.replace('/', ''))
                Router.navigate(Router.state.location.pathname)
            }
        })
    }

    componentDidMount() {        
        this.getCategories()
    }

    render() {
        let { categories } = this.state
        let { setCategory } = this.context

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
