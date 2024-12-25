import  { Component } from 'react'
import PropTypes from 'prop-types'
import { kebab } from '../utils/kebab'
import './attributes.css'

export default class Attributes extends Component { 

    static propTypes = {
        product: PropTypes.object,
        selected: PropTypes.object,
        setSelected: PropTypes.func,
        testId: PropTypes.string,
    }

    render() {
        let {product, selected, setSelected, testId} = this.props
        let attributes = product.attributes

        let showAttributes = attributes.map((attribute, index) => {
            return (
                <div 
                    data-testid={testId + kebab(attribute.id)}  
                    key={index}>
                    <h2 className={`py-2 ${testId.includes('cart') ? '' : 'font-bold font-robotoCondensed'} `}>
                        {`${testId.includes('cart') ? attribute.id : attribute.id.toUpperCase() }:` }
                    </h2>
                    <div  
                        className={`flex gap-2`}>
                        {attribute.items.map((item, index) =>{
                            return (
                                <button 
                                    data-testid={
                                        testId.includes('cart') ?
                                            `${testId + kebab(attribute.id)}-${item.id == selected[attribute.id] ? 
                                            `${kebab(attribute.id)}-selected` : kebab(attribute.id)}`
                                        : false
                                    }

                                    key={index}

                                    onClick={() => {setSelected ? setSelected(attribute.id, item.id) : ''}} 

                                    className={
                                       `${testId.includes('cart') ? 'pointer-events-none' : ''}
                                        font-sourceSansPro 
                                        ${attribute.type == 'text'?  
                                        `text ${item.id == selected[attribute.id] ? 'text-selected' : '' }`
                                        :`swatch ${item.id == selected[attribute.id] ? 'swatch-selected' : '' }`}`
                                    }

                                    style={{
                                        background: (attribute.type == 'text' ? '' : item.value) 
                                    }}>

                                    {attribute.type == 'text' ?  item.value.toUpperCase() : ''}
                                </button>
                            ) 
                        })}
                    </div>
                </div>
            )
        })
         
        return showAttributes
    }
}
