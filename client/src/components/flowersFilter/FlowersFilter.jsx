import React, { useEffect, useState } from 'react'
import './FlowersFilter.scss'
import Dropdown__icon from '../../assets/icons/dropdown__icon.png'
import Search__icon from '../../assets/icons/Search__icon.png'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import FlowersProduct from '../flowersProduct/FlowersProduct'
import useAuth from '../../hooks/useAuth'
import Prev__icon from '../../assets/icons/prev__icon.png'
import Next__icon from '../../assets/icons/next__icon.png'
import API from '../../api/api'

function FlowersFilter() {
    const [showCategory, setShowCategory] = useState(false)
    const [categoryValue, setCategoryValue] = useState("Category")
    const [searchVisible, setSearchVisible] = useState(false)
    const [flowers, setFlowers] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width: 750px)' })
    const { user } = useAuth()
    const [limit, setLimit] = useState(20);
    const [skip, setSkip] = useState(0);


    const handleSearch = () => {
        setSearchVisible(!searchVisible)
    }

    document.addEventListener("click", (e) => {
        if (e.target.className !== "flowersFilter__left_select" && e.target.className !== 'i') {
            if (showCategory) {
                setShowCategory(false)
            }
        }
    })

    document.addEventListener("click", (e) => {
        if (e.target.className !== "search__icon" && e.target.id !== "search") {
            if (searchVisible) {
                setSearchVisible(false)
            }
        }
    })

    useEffect(() => {
        setLoading(true)
        axios.get(`${API}/product?skip=${skip}&limit=${limit}`, { headers: { 'Authorization': `Bearer ${user?.token}` } })
            .then((res) => {
                setFlowers(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [user, skip, limit])

    const handleSearching = (searchTerm) => {
        setLoading(true)
        axios.get(`${API}/product/search?searchTerm=${searchTerm}`, {
            headers: { 'Authorization': `Bearer ${user?.token}` }
        })
            .then((res) => {
                setFlowers(res.data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }

    const handleCategory = (searchByCategory) => {
        setLoading(true)
        axios.get(`${API}/product/searchByCategory?searchByCategory=${searchByCategory}`, {
            headers: { 'Authorization': `Bearer ${user?.token}` }
        })
            .then((res) => {
                setFlowers(res.data)
                setLoading(false)
                setError(false)
            })
            .catch(err => {
                setError(err.response.data)
            })
    }

    const handleSearchCategory = (e) => {
        setCategoryValue(e.target.innerHTML)
        if (e.target.innerHTML == "ყველა") {
            handleCategory("ყველა")
        } else {
            handleCategory(e.target.innerHTML)
        }
    }

    const handleShowNext = () => {
        if (flowers.length >= 20) {
            setSkip(skip + limit);
        }
    };

    const handleShowPrev = () => {
        if (skip > 0) {
            setSkip(skip - limit);
        }
    };

    return (
        <section className='flowersFilter'>
            <div className="container">
                <div className="flowersFilter__inner">
                    <div className="flowersFilter__left">
                        <div className="flowersFilter__left_box">
                            <div className="flowersFilter__left_select" onClick={() => { setShowCategory(!showCategory) }}>{categoryValue} <img className='i' src={Dropdown__icon} alt="" /></div>
                            {showCategory && <div className="flowersFilter__left_box_content">
                                <p onClick={handleSearchCategory}>სახლის</p>
                                <p onClick={handleSearchCategory}>ბაღის</p>
                                <p onClick={handleSearchCategory}>სასაჩუქრე</p>
                                <p onClick={handleSearchCategory}>ვალენტინობის</p>
                                <p onClick={handleSearchCategory}>დეკორაცია</p>
                                <p onClick={handleSearchCategory}>ყველა</p>
                            </div>}
                        </div>
                    </div>
                    <div className="flowersFilter__right">
                        {!isMobile || searchVisible ? <input type="text" onChange={(e) => handleSearching(e.target.value)} id='search' placeholder='Search...' /> : ""}
                        <label htmlFor="search" onClick={handleSearch}>
                            <img className='search__icon' src={Search__icon} alt="" />
                        </label>
                    </div>
                </div>
            </div>
            {error && <p style={{ textAlign: 'center' }} className="error">{error}</p>}
            <FlowersProduct flowers={flowers} loading={loading} />
            <div className="flowersFilter__showMore_box">
                <button onClick={handleShowPrev} className='flowersFilter__showMore'><img src={Prev__icon} alt="" /> უკან</button>
                <button onClick={handleShowNext} className='flowersFilter__showMore'>წინ <img src={Next__icon} alt="" /></button>
            </div>
        </section>
    )
}

export default FlowersFilter