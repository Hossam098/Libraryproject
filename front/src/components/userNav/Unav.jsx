import { useState, useEffect, } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import './unav.css'
import Toggle from '../togglrLang/Toggle'
import { Link, NavLink } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import profileimg from '../../images/Ellipse 1.png'
import { RxAvatar } from 'react-icons/rx'
import { TbLanguage } from 'react-icons/tb'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

const Unav = () => {

    const [t] = useTranslation()
    const [showServices, setShowServices] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const toggleServices = () => {
        setShowServices((prevShowMenu) => !prevShowMenu);
    };
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const [logged, setLogged] = useState('')
    const [services, setServices] = useState([])
    const [user, setUser] = useState({})







    useEffect(() => {
        axios.defaults.withCredentials = true
        try {
            axios.get(`${API_URL}/auth/check`, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                    setLogged(true)
                    setUser(res.data.user)

                })
                .catch((err) => {
                    console.log(err)
                    setLogged(false)
                })



            axios.get(`${API_URL}/getallwaiting`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setServices(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })


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
        <nav className='UNAV' style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'ltr' } : { direction: 'rtl' }}>
            <div className={localStorage.getItem('i18nextLng') === 'ar' ? "menu r" : "menu l"}
                onClick={() => { toggleMenu(); setShowServices(false); }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="right" >
                {logged ? (<li>
                    <a href="#" onClick={() => { toggleServices(); setShowMenu(false); }} onBlur={() => { setServices(false) }}>
                        <div className="profile-image">
                            <img src={user.img == "" || user.img == null ? profileimg : `http://localhost:5000/${user.national_id}/${user.img}`} alt="" />
                        </div>
                    </a>
                    {showServices && (
                        <ul className="dropdown" style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                            <li><Link to='/profile' onClick={() => { setShowServices(false); }}><RxAvatar /> {t('profile')}</Link></li>
                            <li><TbLanguage /><Toggle /></li>
                            <hr />
                            <li onClick={handleLogout} className='logout'><FiLogOut /> {t('logout')}</li>
                        </ul>
                    )}
                </li>) : (
                    <>
                        <li><Toggle /></li>
                        <li><li onClick={handleLogin} style={{ fontSize: '1.5rem', cursor: "pointer" }}><FiLogIn />{t('Login')}</li></li>
                    </>
                )}
            </div>
            <div className="left">
                <ul className={`left${showMenu ? ' open' : ''}`}>
                    <li>
                        <NavLink to="/" onClick={() => { setShowMenu(false); setShowServices(false) }}>{t('Home')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" onClick={() => { setShowMenu(false); setShowServices(false) }}>{t('contact')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" onClick={() => { setShowMenu(false); setShowServices(false) }}>{t('about-us')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/allServices" onClick={() => { setShowMenu(false); setShowServices(false) }}>
                            {t('services')}
                        </NavLink>
                    </li>
                    {logged && (
                        <li>
                            {(services.length == 0) ?
                                <p style={{ color: 'gray', cursor: "not-allowed" }}>{t('services-status')}</p>
                                :

                                <NavLink to="/Myservices" onClick={() => { setShowMenu(false); setShowServices(false) }}>{t('services-status')}</NavLink>
                            }
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default Unav