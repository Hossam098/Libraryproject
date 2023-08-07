import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import './unav.css'
import Toggle from '../togglrLang/Toggle'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import profileimg from '../../images/Ellipse 1.png'
import { RxAvatar } from 'react-icons/rx'
import { TbLanguage } from 'react-icons/tb'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

const Unav = () => {

    const [t] = useTranslation()
    const [showServices, setShowServices] = useState(false);

    const toggleServices = () => {
        setShowServices(!showServices);
    };

    const [logged, setLogged] = useState('')

    useEffect(() => {
        try {
            if (!localStorage.getItem('token')) {
                setLogged(false)
            } else {
                setLogged(true)
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    const handleLogout = () => {
        try {
            axios.get(`${API_URL}/auth/logout`, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                    localStorage.removeItem('token')
                    window.location.href = '/login'
                })
                .catch((err) => {
                    console.log(err)
                })

        } catch (err) {
            console.log(err)
        }
    }
    const handleLogin = () => {
        window.location.href = '/login'
    }

    return (
        <nav style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
            
            <div className="left">
                <ul className="left">
                    <li>
                        <Link to="/">{t('Home')}</Link>
                    </li>
                    <li>
                        <Link>{t('contact')}</Link>
                    </li>
                    <li>
                        <Link>{t('about-us')}</Link>
                    </li>
                    <li>
                        <Link>{t('services')}</Link>
                    </li>
                    <li>
                        <Link to="/Myservices">{t('services-status')}</Link>
                    </li>

                </ul>
            </div>
            <div className="right">
                {logged ? (<li>
                    <a href="#" onClick={toggleServices}>
                        <div className="profile-image">
                            <img src={profileimg} alt="" />
                        </div>
                    </a>
                    {showServices && (
                        <ul className="dropdown" style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                            <li><Link to='/profile'><RxAvatar /> {t('profile')}</Link></li>
                            <li><Toggle /></li>
                            <hr />
                            <li onClick={handleLogout} className='logout'><FiLogOut /> {t('logout')}</li>
                        </ul>
                    )}
                </li>) : (
                    <li><li onClick={handleLogin}><FiLogIn />{t('Login')}</li></li>
                )}
            </div>
        </nav>
    )
}

export default Unav