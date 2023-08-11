import { useState, useEffect, useRef} from 'react'
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

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [logged, setLogged] = useState('')
    const [reg, setReg] = useState([])
    const [formation, setFormation] = useState([])
    const [personal, setPersonal] = useState([])
    const [magazine, setMagazine] = useState([])
    const [bestMessage, setBestMessage] = useState([])

    const menuRef = useRef(null);


    // const toggleDropdown = () => {
    //     setIsDropdownOpen(!isDropdownOpen);
    //   };


    useEffect(() => {
        function handleClickOutside(event) {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    useEffect(() => {
        axios.defaults.withCredentials = true
        try {
            axios.get(`${API_URL}/auth/check`, { withCredentials: true })
                .then((res) => {
                    console.log(res)
                    setLogged(true)
                })
                .catch((err) => {
                    console.log(err)
                    setLogged(false)
                })



            axios.get(`${API_URL}/getallwaitingofregistration`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setReg(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })

            axios.get(`${API_URL}/getallwaitingofformation`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setFormation(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            axios.get(`${API_URL}/getallwaitingofpersonal`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setPersonal(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            axios.get(`${API_URL}/getallwaitingofmagazine`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setMagazine(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
            axios.get(`${API_URL}/getallwaitingofbestmessage`, { withCredentials: true })
                .then((res) => {
                    console.log(res.data)
                    setBestMessage(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })

        } catch (err) {
            console.log(err)
        }

    }, [])
    


    // console.log(counter)

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
        <nav style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'ltr' } : { direction: 'rtl' }}>
            <div className={localStorage.getItem('i18nextLng')=== 'ar'?"menu r":"menu l"}
                onClick={()=>{toggleMenu(); setShowServices(false);}}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="right" >
                {logged ? (<li>
                    <a href="#" onClick={()=>{toggleServices(); setShowMenu(false);}}>
                        <div className="profile-image">
                            <img src={profileimg} alt="" />
                        </div>
                    </a>
                    {showServices && (
                        <ul className="dropdown" style={localStorage.getItem('i18nextLng') === 'ar' ? { direction: 'rtl' } : { direction: 'ltr' }}>
                            <li><Link to='/profile'><RxAvatar /> {t('profile')}</Link></li>
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

                <ul className={showMenu?" open left":"left"}>
                    <li>
                        <NavLink to="/" onClick={()=>{setShowMenu(false); setShowServices(false) }}>{t('Home')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact"  onClick={()=>{setShowMenu(false); setShowServices(false)}}>{t('contact')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about"  onClick={()=>{setShowMenu(false); setShowServices(false)}}>{t('about-us')}</NavLink>
                    </li>
                    <li>
                        <NavLink to="/allServices"  onClick={()=>{setShowMenu(false); setShowServices(false)}}>
                            {t('services')}
                        </NavLink>
                    </li>
                    {logged && (


                        <li>
                            {(bestMessage.length == 0 && magazine.length == 0 && personal.length == 0 && formation.length == 0 && reg.length == 0) ?
                                <p style={{ color: 'gray', cursor: "not-allowed" }}>{t('services-status')}</p>
                                :

                                <NavLink to="/Myservices" onClick={()=>{setShowMenu(false); setShowServices(false)}}>{t('services-status')}</NavLink>
                            }
                        </li>
                    )}

                </ul>

            </div>
            
        </nav>
    )
}

export default Unav