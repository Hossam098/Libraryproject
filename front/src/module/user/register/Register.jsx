import { useState, useEffect } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Toggle from '../../../components/togglrLang/Toggle';
import './register.css'
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../../config';
import axios from 'axios'
import { use } from 'i18next';

const Register = () => {

  const [t] = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    checkpassword: "",
    national_id: "",
    phone: "",
    natinality: "",
    university: "",
    other_uni: "",
    faculity: "",
  })


  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(user));
    if (Object.keys(errors).length === 0 ) {
      axios.defaults.withCredentials = true
      try{
        axios.post('http://localhost:5000/auth/register',user, { withCredentials: true })
        .then((res)=>{
          console.log("logged")
          console.log(res)
        })
        .catch((err)=>{
          console.log(err)
          
        })

        
      }catch(err){
        console.log(err)
      }
      
    }else{
      console.log(errors)
    }
    // setIsSubmit(true);
  }


  // axios.defaults.withCredentials = true

  // const handleLogin = (e) => {
  //     e.preventDefault()
  //     try {
  //         axios.post('http://localhost:5000/login', loginData, { withCredentials: true })
  //             .then((res) => {
  //                 navigate('/profile')
  //             }).catch((error) => {
  //                 setError(error.response.data.errors[0].msg)
  //             })

  //     } catch (error) {
  //         console.log(error)
  //     }
  // }


  const validate = (values) => {
    const errors = {}
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    if (!values.name) {
      errors.name = `${t('name-err')}`
    }
    if (!values.email) {
      errors.email = `${t('email-err')}`
    } else if (!regex.test(values.email)) {
      errors.email = `${t('email-v-err')}`
    }
    if (!values.password) {
      errors.password = `${t('pass-err')}`
    } else if (values.password.length < 8) {
      errors.password = `${t('pass-err-min')}`
    }
    if (!values.national_id) {
      errors.national_id = `${t('n-id-err')}`
    }
    if (!values.phone) {
      errors.phone = `${t('phone-err')}`
    }
    if (!values.natinality) {
      errors.natinality = `${t('nation-err')}`
    }
    if (!values.university) {
      errors.university = `${t('uni-err')}`
    }
    if(values.university === "0"){
      if (!values.other_uni) {
        errors.other_uni = `${t('uni-err')}`
      }
    }
    if (!values.faculity) {
      errors.faculity = `${t('fac-err')}`
    }
    if (!values.checkpassword) {
      errors.checkpassword = `${t('re-pass-err')}`
    } else if ((values.checkpassword !== values.password)) {
      errors.checkpassword = `${t('pass-match-err')}`
    }



    return errors;
  }

  // useEffect(()=>{
  //   console.log(errors)
  //   if(Object.keys(errors).length === 0 && isSubmit){
  //     console.log("valid")
  //   }

  // },[errors])

  return (
    <div className="main">
      <div className="main-image">
        <img src="./assets/uni-logo.png" alt="" />
      </div>

      <div className="main-content">
        <div className="main-content-logo">
          <img src="./assets/mini-logo.png" alt="" />
        </div>
        <div class="main-content">
          <div class="main-content-form">
            <h3>{t('cerate')}</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-container">


                <div class="input">
                  <label>{t('name')} </label>
                  <input

                    style={
                      localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }
                    }
                    type="text"
                    className={errors.name ? 'error-in' : ''}
                    placeholder={t('e-name')}
                    value={user.name}
                    onChange={(e) => { setUser({ ...user, name: e.target.value }) }}
                  />
                  <p className='error'>{errors.name}</p>
                </div>


                <div class="input" >
                  <label >{t('email')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.email ? 'error-in' : ''}
                    placeholder={t('e-email')}
                    value={user.email}
                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                  />
                  <p className='error'>{errors.email}</p>
                </div>


                <div class="input">
                  <label>{t('n-id')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.national_id ? 'error-in' : ''}
                    placeholder={t('e-n-id')}
                    value={user.national_id}
                    onChange={(e) => { setUser({ ...user, national_id: e.target.value }) }}
                  />
                  <p className='error'>{errors.national_id}</p>
                </div>


                <div class="input">
                  <label>{t('phone')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.phone ? 'error-in' : ''}
                    placeholder={t('e-phone')}
                    value={user.phone}
                    onChange={(e) => { setUser({ ...user, phone: e.target.value }) }}
                  />
                  <p className='error'>{errors.phone}</p>
                </div>


                <div class="input">
                  <label>{t('nation')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.natinality ? 'error-in' : ''}
                    placeholder={t('e-nation')}
                    value={user.natinality}
                    onChange={(e) => { setUser({ ...user, natinality: e.target.value }) }}
                  />
                  <p className='error'>{errors.natinality}</p>
                </div>


                {/* <div class="input">
                  <label>{t('uni')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.university ? 'error-in' : ''}
                    placeholder={t('e-uni')}
                    value={user.university}
                    onChange={(e) => { setUser({ ...user, university: e.target.value }) }}
                  />
                  <p className='error'>{errors.university}</p>
                </div> */}

                <div className="input">
                  <label>{t('uni')}</label>
                  <select
                    className={errors.university ? 'error-in' : ''}
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    value={user.university}
                    onChange={(e) => { setUser({ ...user, university: e.target.value }) }}
                  >
                    <option value="" >{t('uni')} </option>
                    <option value="1">{t('helwan-uni')} </option>
                    <option value="0">{t('other-uni')} </option>
                  </select>
                  <p className='error'>{errors.university}</p>
                </div>
                

                {user.university === "0" && (
                  <div class="input">
                  <label>{t('uni-name')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') === "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.other_uni ? 'error-in' : ''}
                    placeholder={t('e-uni')}
                    value={user.other_uni}
                    onChange={(e) => { setUser({ ...user, other_uni: e.target.value }) }}
                  />
                  <p className='error'>{errors.other_uni}</p>
                </div>
                )}
                


                <div class="input">
                  <label>{t('fac')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.faculity ? 'error-in' : ''}
                    placeholder={t('e-fac')}
                    value={user.faculity}
                    onChange={(e) => { setUser({ ...user, faculity: e.target.value }) }}
                  />
                  <p className='error'>{errors.faculity}</p>
                </div>


                <div class="input">
                  <label>{t('pass')} </label>
                  <div
                    className={`passwordcontainer ${errors.password ? 'error-in' : ''}`}
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                  >
                    <input
                      style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                      type={showPassword ? 'text' : 'password'}
                      className={errors.password ? 'error-in' : ''}
                      placeholder={t('e-pass')}
                      value={user.password}
                      onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                    />

                    <span onClick={togglePasswordVisibility}>
                      {showPassword ? <HiEyeOff /> : <HiEye />}
                    </span>
                  </div>
                  <p className='error'>{errors.password}</p>
                </div>


                <div class="input">
                  <label>{t('re-pass')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="password"
                    className={errors.checkpassword ? 'error-in' : ''}
                    placeholder={t('e-re-pass')}
                    value={user.checkpassword}
                    onChange={(e) => { setUser({ ...user, checkpassword: e.target.value }) }}
                  />
                  <p className='error'>{errors.checkpassword}</p>
                </div>

              </div>
              <input type="submit" value={t('next')} />
            </form>

          </div>
        </div>
      </div>
      <div className="lang">
        <Toggle />
      </div>
    </div>
  )
}

export default Register