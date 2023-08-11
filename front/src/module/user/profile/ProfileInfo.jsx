import React from 'react'
import { useTranslation } from 'react-i18next'

const ProfileInfo = (props) => {

    const [t] = useTranslation();
    console.log(props)

    return (
        <div className="subnav-content">
            <div className="subnav-content-item">
                <h3>{t('name')}</h3>
                <input
                    type="text"
                    value={props.user.name}
                    onChange={(e) => { props.setUser({ ...props.user, name: e.target.value }) }}
                />
            </div>
            <div className='subnav-content-item'>
                <h3>{t('email')}</h3>
                <input
                    type="text"
                    value={props.user.email}
                    onChange={(e) => { props.setUser({ ...props.user, email: e.target.value }) }}
                />
            </div>
            <div className='subnav-content-item'>
                <h3>{t('n-id')}</h3>
                <input
                    type="text"
                    value={props.user.nationl_id}
                    onChange={(e) => { props.setUser({ ...props.user, nationl_id: e.target.value }) }}
                />
            </div>
            <div className='subnav-content-item'>
                <h3>{t('phone')}</h3>
                <input
                    type="text"
                    value={props.user.phone}
                    onChange={(e) => { props.setUser({ ...props.user, phone: e.target.value }) }}
                />
            </div>
            <div className='subnav-content-item'>
                <h3>{t('nation')}</h3>
                <input
                    type="text"
                    value={props.user.nationlity}
                    onChange={(e) => { props.setUser({ ...props.user, nationlity: e.target.value }) }}    
                />
            </div>
            <div className='subnav-content-item'>
                <h3>{t('uni')}</h3>
                <input
                    type="text"
                    value={props.user.univerity}
                    onChange={(e) => { props.setUser({ ...props.user, univerity: e.target.value }) }}
                />
            </div>
            <div className='subnav-content-item'>
                <h3>{t('fac')}</h3>
                <input
                    type="text"
                    value={props.user.faculiy}
                    onChange={(e) => { props.setUser({ ...props.user, faculiy: e.target.value }) }}
                />
            </div>
            <div className='subnav-content-item'>
                <h3>{t('dep')}</h3>
                <input
                    type="text"
                    value={props.user.departent}
                    onChange={(e) => { props.setUser({ ...props.user, departent: e.target.value }) }}
                />
            </div>
            <button className="waitbtn-edit">
                {t('edit-btn')}
            </button>
        </div>
    )
}

export default ProfileInfo