import { useState, useEffect } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Toggle from '../../../components/togglrLang/Toggle';
import { useTranslation } from 'react-i18next';
import './login.css'
import axios from 'axios';
import { API_URL } from '../../../config';
import { Link, useNavigate } from 'react-router-dom';
import PopupError from '../../../components/error/PopupError';
import { Link } from 'react-router-dom';


const Login = () => {

  const [t] = useTranslation();
  const [errors2, setErrors2] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: ""
  })


  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }
  const handleCloseError = () => {
    setErrors2('');
  };



  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
          axios.defaults.withCredentials = true
          try{
            axios.post(`${API_URL}/auth/login`,user, { withCredentials: true })
            .then((res)=>{
              console.log("logged")
              if(res.data.login == true){
                localStorage.setItem('token', res.data.token)
                navigate('/')
              }
            })
            .catch((err)=>{
              console.log(err.response.data.message[0])
              setErrors2(err.response.data.message[0])
    
            })
    
            
          }catch(err){
            console.log(err)
          }
          
        }else{
          console.log(errors)
        }
  }, [errors]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(user));
    setIsSubmitting(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  
    if (!values.email) {
      errors.email = `${t('email-err')}`;
    } else if (!regex.test(values.email)) {
      errors.email = `${t('email-v-err')}`;
    }
  
    if (!values.password) {
      errors.password = `${t('pass-err')}`;
    } else if (values.password.length < 7) {
      errors.password = `${t('pass-err-min')}`;
    }
  
    return errors; // Add this line to return the errors object
  };


  return (
    <div className="main">
      {errors2 && (
        <PopupError
          message={errors2}
          onClose={handleCloseError}
        />
      )}
      <div className="main-image" style={{height:"100%"}}>
        <img src="./assets/uni-logo.png" alt="" />
      </div>

      <div className="main-content">
        <div className="main-content-logo" >
          <img src="./assets/mini-logo.png" alt="" className='im' />
        </div>
        <div class="main-content">
          <div class="main-content-form">
            <h3 style={{marginBottom:"1rem"}}>{t('Login')}</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-login-container" style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" , textAlign:"right"} : { direction: "ltr" , textAlign:"left"}}>
      
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
                      {showPassword ? <HiEyeOff style={{color:"#003C70"}}/> : <HiEye style={{color:"#003C70"}}/>}
                    </span>
                  </div>
                  <p className='error'>{errors.password}</p>
                </div>




              </div>
<<<<<<< HEAD
              <input type="submit" value={t('next')} />
              <Link style={{color:"black", marginTop:"2rem",display:"block"}}>forget password</Link>
            </form>
            
=======
              <input type="submit" value={t('Login')} style={{marginBottom:"1rem"}}/>
            </form>

            <Link to="/register" className="link">{t('register-link')}</Link>
>>>>>>> 9eec7fa8d6a6181f9f908301cf807ad64e299d5e
          </div>
        </div>
      </div>
      <div className="lang">
        <Toggle />
      </div>
    </div>
  )
}

export default Login