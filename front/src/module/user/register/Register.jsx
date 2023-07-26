import { useState, useEffect } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Toggle from '../../../components/togglrLang/Toggle';
import './register.css'
import { useTranslation } from 'react-i18next';

const Register = () => {

  const [t] = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    check_password: "",
    national_id: "",
    phone_number: "",
    natinality: "",
    university: "",
    faculty: "",
  })


  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    setErrors(validate(user));
    if(errors.length === 0){
      //axios here
    }
    // setIsSubmit(true);
  }

  const validate = (values)=>{
    const errors ={}
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    if(!values.name){
      errors.name = `${t('name-err')}`
    }
    if(!values.email){
      errors.email = `${t('email-err')}`
    }else if(!regex.test(values.email)){
      errors.email = `${t('email-v-err')}` 
    }
    if(!values.password){
      errors.password = `${t('pass-err')}`
    }else if(values.password.length < 7){
      errors.password = `${t('pass-err-min')}`
    }
    if(!values.national_id){
      errors.national_id = `${t('n-id-err')}`
    }
    if(!values.phone_number){
      errors.phone_number = `${t('phone-err')}`
    }
    if(!values.natinality){
      errors.natinality = `${t('nation-err')}`
    }
    if(!values.university){
      errors.university = `${t('uni-err')}`
    }
    if(!values.faculty){
      errors.faculty = `${t('fac-err')}`
    }
    if(!values.check_password){
      errors.check_password = `${t('re-pass-err')}`
    }else if((values.check_password !== values.password)){
      errors.check_password = `${t('pass-match-err')}`
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
                    onChange={(e)=>{ setUser({ ...user, name: e.target.value }) }}
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
                    onChange={(e)=>{ setUser({ ...user, email: e.target.value }) }}
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
                    onChange={(e)=>{ setUser({ ...user, national_id: e.target.value }) }}
                  />
                  <p className='error'>{errors.national_id}</p>
                </div>


                <div class="input">
                  <label>{t('phone')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}  
                    type="text"
                    className={errors.phone_number ? 'error-in' : ''}
                    placeholder={t('e-phone')}
                    value={user.phone_number}
                    onChange={(e)=>{ setUser({ ...user, phone_number: e.target.value }) }}
                  />
                  <p className='error'>{errors.phone_number}</p>
                </div>


                <div class="input">
                  <label>{t('nation')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}  
                    type="text"
                    className={errors.natinality ? 'error-in' : ''}
                    placeholder={t('e-nation')}
                    value={user.natinality}
                    onChange={(e)=>{ setUser({ ...user, natinality: e.target.value }) }}
                  />
                  <p className='error'>{errors.natinality}</p>
                </div>


                <div class="input">
                  <label>{t('uni')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}  
                    type="text"
                    className={errors.university ? 'error-in' : ''}
                    placeholder={t('e-uni')} 
                    value={user.university}
                    onChange={(e)=>{ setUser({ ...user, university: e.target.value }) }}
                  />
                  <p className='error'>{errors.university}</p>
                </div>


                <div class="input">
                  <label>{t('fac')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}  
                    type="text"
                    className={errors.faculty ? 'error-in' : ''}
                    placeholder={t('e-fac')}
                    value={user.faculty}
                    onChange={(e)=>{ setUser({ ...user, faculty: e.target.value }) }}
                  />
                  <p className='error'>{errors.faculty}</p>
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
                      onChange={(e)=>{ setUser({ ...user, password: e.target.value }) }}
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
                    type="text"
                    className={errors.check_password ? 'error-in' : ''}
                    placeholder={t('e-re-pass')}
                    value={user.check_password}
                    onChange={(e)=>{ setUser({ ...user, check_password: e.target.value }) }}
                  />
                  <p className='error'>{errors.check_password}</p>
                </div>


               

                {/* <div className="input">
                  <label>الاسم</label>
                  <select name="" id="">
                    <option value="">1</option>
                    <option value="">2</option>
                    <option value="">3</option>
                  </select>
                </div> */}

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