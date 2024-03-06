import React, { useEffect, useState } from 'react'
import './Collection.scss'
import Button from '../button/Button'
import { ColorRing } from 'react-loader-spinner'
// import swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import axios from 'axios'
import Product from '../product/Product';
import useAuth from '../../hooks/useAuth'
import API from '../../api/api'

function Collection() {
  const [flowers, setFlowers] = useState([])
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    setLoading(true)
    axios.get(`${API}/product`, { headers: { 'Authorization': `Bearer ${user?.token}` } })
      .then((res) => { setFlowers(res.data), setLoading(false) })
      .catch(err => console.log(err))
  }, [user])

  return (
    <section className='collection'>
      <div className="container">
        <div className="collection__inner">
          <div className="collection__inner_top">
            <h1>- Our best product -</h1>
            <Button params={'flowers'} text={"Shop now"} />
          </div>
          <div className="collection__slider">
            <Swiper
              slidesPerView={5}
              spaceBetween={20}
              breakpoints={{
                100: {
                  slidesPerView: 1,
                },
                450: {
                  slidesPerView: 2,
                },
                700: {
                  slidesPerView: 3,
                },
                1000: {
                  slidesPerView: 4,
                },
                1370: {
                  slidesPerView: 5,
                },
              }}
              loop={false}
              // autoplay={{
              //   delay: 2000,
              //   disableOnInteraction: false,
              // }}
              modules={[Autoplay, Pagination]}
              className="mySwiper"
            >
              {loading ? <ColorRing
                visible={true}
                height="180"
                width="180"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              /> : flowers.map((item, i) => {
                return <SwiperSlide type={"collection"} key={i}>{<Product id={item._id} title={item.title} price={item.new_price} main_image={item.mainImg} />}</SwiperSlide>
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Collection