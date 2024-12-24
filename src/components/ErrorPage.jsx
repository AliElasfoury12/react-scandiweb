import  { Component } from 'react'
import PropTypes from 'prop-types'

export default class ErrorPage extends Component {
    static propTypes = {
        type: PropTypes.string
    }

    render() {
        let { type } = this.props
        return (
            <div 
                className='grid place-content-center w-screen h-screen bg-blue-600 z-30 absolute top-0 left-0'>
                <h1 
                    className='text-2xl font-serif text-white'>
                        { type == 'notFound' ? 'NOT FOUND!' : '' }
                        { type == 'loading' ? 'Loading.....' : '' }
                        { type == 'error' ? 'Something Went Wrong' : '' }
                    </h1> 
            </div>
        )
    }
}
