import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import './unav.css'
import Toggle from '../togglrLang/Toggle'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import profileimg from '../../images/Ellipse 1.png'
import {RxAvatar} from 'react-icons/rx'
import {TbLanguage} from 'react-icons/tb'
import {FiLogOut} from 'react-icons/fi'

const Unav = () => {

    const [t] = useTranslation()
    const [showServices, setShowServices] = useState(false);

    const toggleServices = () => {
        setShowServices(!showServices);
    };

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

    return (
        <nav>
            <div className="right">
                <li>
                    <a href="#" onClick={toggleServices}>
                        <div className="profile-image">
                            <img src={profileimg} alt="" />
                        </div>
                    </a>
                    {showServices && (
                        <ul className="dropdown">
                            <li><RxAvatar/><Link to='/profile'>profile</Link></li>
                            <li><TbLanguage/> <Toggle/></li>
                            <li onClick={handleLogout}><FiLogOut/> logout</li>
                        </ul>
                    )}
                </li>
            </div>
            <div className="left">
                <ul className="left">
                    <li>
                        <Link>{t('contact')}</Link>
                    </li>
                    <li>
                        <Link>{t('about')}</Link>
                    </li>
                    <li>
                        <Link>{t('services')}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Unav