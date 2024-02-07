import React from 'react'
import './FlowersProduct.scss'
import Product from '../product/Product'
import { ColorRing } from 'react-loader-spinner'

function FlowersProduct({ flowers, loading }) {

    return (
        <section className='flowersProduct'>
            <div className="container">
                <div className="flowersProduct__inner">
                    {loading ? <ColorRing
                        visible={true}
                        height="180"
                        width="180"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    /> : flowers.map(flower => (<Product id={flower._id} key={flower._id} title={flower.title} price={flower.new_price} main_image={flower.mainImg} />))}
                </div>
            </div>
        </section>
    )
}

export default FlowersProduct