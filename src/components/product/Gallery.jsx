import  { Component } from 'react'
import cartRight from '../../assets/CaretRight.svg'
import cartLeft from '../../assets/CaretLeft.svg'
import PropTypes from 'prop-types'

export default class Gallery extends Component { 

    static propTypes = {
        product: PropTypes.object
    }
    
    state = {
        image: 0,
        galleryHeight: 0,
        mainImgHeight: 0
    }

    componentDidMount () {
        setTimeout(() => {
            let mainImgHeight = document.getElementById('main-image').clientHeight
            this.setState({mainImgHeight})
            let galleryHeight = document.getElementById('gallery-images').clientHeight
            this.setState({galleryHeight})
        }, 100)
    }

    render() {
        let {product} = this.props
        let {image, galleryHeight, mainImgHeight} = this.state
        let gallery = product.gallery
                
        return ( 
            <div  
                data-testid='product-gallery' 
                className='flex justify-center gap-10 pr-3 mb-4 max-w-[30rem]'>
                <aside 
                    id='gallery-images'
                    style={{height: galleryHeight > mainImgHeight ? `${mainImgHeight}px` : 'fit-content'}}
                    className={`${galleryHeight > mainImgHeight ? `overflow-y-scroll` : ''} px-2 w-fit flex flex-col items-center `} >
                    {gallery.map((img, index) => {
                        return <img 
                                onClick={() => this.setState({image: index})}
                                key={index} 
                                className='w-32 h-32 mb-5 object-contain' 
                                src={img.img} alt="galery-img" />
                    })}
                </aside> 

                <div className='flex relative justify-center h-fit'>
                   
                    <img 
                        id='main-image' 
                        className='max-h-[35rem] object-contain' 
                        src={product.gallery[image].img} 
                        alt="main-image"
                    />

                   {
                    gallery.length > 1 ? 
                        <div className='absolute top-1/2 flex justify-between w-full'>
                            <button  onClick={() => image > 0 && this.setState({image: image-1 })}>
                                <img className='bg-black object-contain' src={cartLeft} alt="left-arrow" />
                            </button>

                            <button onClick={() => image < gallery.length -1 && this.setState({image: image+1 })}>
                                <img className='bg-black object-contain' src={cartRight} alt="right-arrow" />
                            </button>
                        </div>
                    : ''}
                </div>
            </div>
        )
    }
}
