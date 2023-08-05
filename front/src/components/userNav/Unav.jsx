import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineDown, AiOutlineRight } from 'react-icons/ai'
import './unav.css'
import Toggle from '../togglrLang/Toggle'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'
import profileimg from '../../images/Ellipse 1.png'


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
                            <li><Link to='/profile'>profile</Link></li>
                            <li><a href="#">language</a></li>
                            <li onClick={handleLogout}>logout</li>
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