import React, { useRef, useState } from 'react'
import './CreateProduct.scss'
import Dropdown__icon from '../../assets/icons/dropdown__icon.png'
import useAuth from '../../hooks/useAuth.js'
import axios from 'axios'
import API from '../../api/api.js'
import { useNavigate } from 'react-router-dom'
import CreateLoader from '../loaders/CreateLoader.jsx'

function CreateForm() {
    const [searchWordValue, setSearchWordValue] = useState('')
    const [searchWord, setSearchWord] = useState(["ყვავილი", "ყვავილები"])
    const [showCategory, setShowCategory] = useState(false)
    const [categoryValue, setCategoryValue] = useState("Category")
    const [mainImg, setMainImg] = useState('')
    const [title, setTitle] = useState('')
    const [new_price, setNewPrice] = useState('')
    const [old_price, setOldPrice] = useState('')
    const [error, setError] = useState("")
    const [images, setImages] = useState(null)
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()
    const searchRef = useRef()
    const navigate = useNavigate()

    const addNewSearchWord = () => {
        if (searchWordValue.trim() !== "" && searchWord.length < 7) {
            setSearchWord([...searchWord, searchWordValue])
            searchRef?.current && (searchRef.current.value = '');
        }
    }

    const removeSearchWord = (item) => {
        setSearchWord(searchWord.filter(text => text !== item))
    }

    const handleMainImg = async (e) => {
        const file = e.target.files[0]

        setImages(file);
    }

    const handleSubmit = (e) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('image', images);
        formData.append('file', mainImg)
        formData.append('title', title)
        formData.append('category', categoryValue)
        formData.append('searchWords', searchWord)
        formData.append('new_price', new_price)
        formData.append('old_price', old_price)
        formData.append('userID', user.userID)

        axios.post(`${API}/product`, formData, { headers: { 'Authorization': `Bearer ${user?.token}` } })
            .then((res) => {
                setLoading(false)
                navigate('/flowers')
                window.location.reload()
            })
            .catch((err) => {
                setError(err?.response?.data);
            })
    }

    const postImages = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImages(reader.result)
        }
    }

    const handleCategoryValue = (e) => {
        setCategoryValue(e.target.innerHTML)
        setShowCategory(false)
    }

    return (
        <section className='create'>
            <div className="container">
                <form className='create__inner'>
                    <div className="create__box">
                        <label htmlFor="title">დაამატეთ სახელი</label>
                        <input value={title} onChange={e => setTitle(e.target.value)} type="text" id='title' />
                    </div>
                    <div className="create__price">
                        <div className="create__box">
                            <label htmlFor="new_price">დაამატეთ ახალი ფასი</label>
                            <input value={new_price} onChange={e => setNewPrice(e.target.value)} type="text" id='new_price' />
                        </div>
                        <div className="create__box">
                            <label htmlFor="old_price">დაამატეთ ძველი ფასი</label>
                            <input value={old_price} onChange={e => setOldPrice(e.target.value)} type="text" id='old_price' />
                        </div>
                    </div>
                    <div className="create__bottom">
                        <div className="create__box">
                            <label>დაამატეთ კატეგორიები</label>
                            <div className="create__bottom_box">
                                <div className="create__bottom_select" onClick={() => { setShowCategory(!showCategory) }}>{categoryValue}<img className='i' src={Dropdown__icon} alt="" /></div>
                                {showCategory && <div className="create__bottom_box_content">
                                    <p onClick={handleCategoryValue}>სახლის</p>
                                    <p onClick={handleCategoryValue}>ბაღის</p>
                                    <p onClick={handleCategoryValue}>სასაჩუქრე</p>
                                    <p onClick={handleCategoryValue}>ვალენტინობის</p>
                                    <p onClick={handleCategoryValue}>დეკორაცია</p>
                                </div>}
                            </div>
                        </div>
                        <div className="create__box">
                            <label htmlFor="search_word">დაამატეთ საძიებო სიტყვები max(5)-min(1)</label>
                            <input ref={searchRef} type="text" onChange={(e) => setSearchWordValue(e.target.value)} id='search_word' />
                            <div className="create__category_box">{searchWord?.map((item, i) => { return <p className='create__category' key={i}>{item} <span onClick={() => removeSearchWord(item)}>X</span></p> })}</div>
                            <button className='create__box_button' onClick={addNewSearchWord} type='button'>საძიებო სიტყვის დამატება</button>
                        </div>
                    </div>
                    <div className="create__file">
                        <div className="create__box">
                            <label>დაამატეთ მთავარი სურათი</label>
                            <input name='mainImg' onChange={handleMainImg} type='file' />
                        </div>
                    </div>
                    <button className='create__submit_button' type='button' onClick={handleSubmit}>{loading ? <CreateLoader /> : "პროდუკტის შექმნა"}</button>
                    {error && <p className='error'>{error}</p>}
                </form>
            </div>
        </section>
    )
}

export default CreateForm