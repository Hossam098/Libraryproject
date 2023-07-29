import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {AiOutlineDown, AiOutlineRight} from 'react-icons/ai'
import './unav.css'
import Toggle from '../togglrLang/Toggle'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../config'


const Unav = () => {

    const [t] = useTranslation()
    const [showServices, setShowServices] = useState(false);

    const toggleServices = () => {
        setShowServices(!showServices);
    };

    const handleLogout = () => {
        try{
            axios.get(`${API_URL}/auth/logout`, { withCredentials: true })
            .then((res)=>{
                console.log(res)
                localStorage.removeItem('token')
                window.location.href = '/login'
            })
            .catch((err)=>{
                console.log(err)
            })

        }catch(err){
            console.log(err)
        }
    }

    return (
        <nav>
            <div className="right">
                <Link to={"/user/profile"}>
                    <div className="profile-image">
                        <img src="./assets/Ellipse 1.png" alt="" />
                    </div>
                </Link>
                <div className="logout" onClick={()=>{handleLogout()}}>{t('logout')}</div>
                <Toggle />
            </div>
            <div className="left">
                <ul className="left">
                    <li>
                        <Link>{t('contact')}</Link>
                    </li>
                    <li>
                        <a href="#" onClick={toggleServices}>
                            {showServices?<AiOutlineDown/>:<AiOutlineRight/>}
                             {t('Services')}
                        </a>
                        {showServices && (
                            <ul className="dropdown">
                                <li><a href="#">extracting a statement that the title of the thesis plan is not previously registered</a></li>
                                <li><a href="#">Service 2</a></li>
                                <li><a href="#">Service 3</a></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Unav