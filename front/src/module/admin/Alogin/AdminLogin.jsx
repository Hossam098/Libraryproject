import { useState, useEffect } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Toggle from '../../../components/togglrLang/Toggle';
import { useTranslation } from 'react-i18next';

import axios from 'axios';
import { API_URL } from '../../../config';
import { Link, useNavigate } from 'react-router-dom';
import PopupError from '../../../components/error/PopupError';




const AdminLogin = () => {


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
      //هنا هتحط ال api 
      //اللوج ان و ترجعلى نوعه
      // axios.get(`${API_URL}/auth/check`, { withCredentials: true })
      //   .then((res) => {
      //     console.log(res)
      //     setLogged(true)
      //     navigate('/')
      //   })
      //   .catch((err) => {
      //     console.log(err)
      //     setLogged(false)
          
      //   })
      // if (Object.keys(errors).length === 0 && isSubmitting) {
      //   axios.defaults.withCredentials = true
      //   try {
      //     axios.post(`${API_URL}/auth/login`, user, { withCredentials: true })
      //       .then((res) => {
      //         console.log("logged")
      //         if (res.data.login == true) {
      //           localStorage.setItem('token', res.data.token)
      //           navigate('/res.data.type')
      //         }
      //       })
      //       .catch((err) => {
      //         console.log(err.response.data.message[0])
      //         setErrors2(err.response.data.message[0])
  
      //       })
  
  
      //   } catch (err) {
      //     console.log(err)
      //   }
  
      // } else {
      //   console.log(errors)
      // }
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
        errors.email = "يرجى ادخال البريد الالكترونى";
      } else if (!regex.test(values.email)) {
        errors.email = "البريد الالكترونى غير صالح";
      }
  
      if (!values.password) {
        errors.password = `${t('pass-err')}`;
      } else if (values.password.length < 7) {
        errors.password = `${t('pass-err-min')}`;
      }
  
      return errors; // Add this line to return the errors object
    };


  return (
    <div>
            <div className="main">
      {errors2 && (
        <PopupError
          message={errors2}
          onClose={handleCloseError}
        />
      )}
      <div className="main-image" style={{ height: "100%" }}>
        <img src="./assets/uni-logo.png" alt="" />
      </div>

      <div className="main-content">
        <div className="main-content-logo" >
          <img src="./assets/mini-logo.png" alt="" className='im' />
        </div>
        <div className="main-content">
          <div className="main-content-form">
            <h3 style={{ marginBottom: "1rem" }}>تسجيل الدخول</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-login-container" style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl", textAlign: "right" } : { direction: "ltr", textAlign: "left" }}>

                <div class="input" >
                  <label >البريد الإلكتروني </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.email ? 'error-in' : ''}
                    placeholder="أدخل بريدك الإلكتروني "
                    value={user.email}
                    onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
                  />
                  <p className='error'>{errors.email}</p>
                </div>

                <div className="input">
                  <label>كلمه المرور</label>
                  <div
                    className={`passwordcontainer ${errors.password ? 'error-in' : ''}`}
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                  >
                    <input
                      style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                      type={showPassword ? 'text' : 'password'}
                      className={errors.password ? 'error-in' : ''}
                      placeholder="ادخل رقمك السري"
                      value={user.password}
                      onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                    />

                    <span onClick={togglePasswordVisibility}>
                      {showPassword ? <HiEyeOff style={{ color: "#003C70" }} /> : <HiEye style={{ color: "#003C70" }} />}
                    </span>
                  </div>
                  <p className='error'>{errors.password}</p>
                </div>




              </div>

              <input type="submit" value="تسجيل الدخول" />
            
              <Link style={{ color: "black", marginTop: "2rem", display: "block" }}>forget password</Link>
            </form>

          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminLogin