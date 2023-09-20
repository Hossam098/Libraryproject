import { useState, useEffect } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { API_URL } from '../../../../config';
import { Link, useNavigate } from 'react-router-dom';
import PopupError from '../../../../components/error/PopupError';




const AdminReset = () => {


  const [t] = useTranslation();
  const [errors2, setErrors2] = useState('');
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({
    re_password: "",
    password: ""
  })


  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }
  const handleCloseError = () => {
    setErrors2('');
  };



//   useEffect(() => {
//     axios.defaults.withCredentials = true
    
//     if (Object.keys(errors).length === 0 && isSubmitting) {
//       axios.defaults.withCredentials = true
//       try {
//         axios.post(`${API_URL}/authmanager/login`, user, { withCredentials: true })
//           .then((res) => {
//             console.log("logged")
//             if (res.data.login == true) {
//               localStorage.setItem('token', res.data.token)
//               navigate('/manager')
//             }
//           })
//           .catch((err) => {
//             if(err.response.status == 401){
//               navigate('/ManagerLogin')
//             }
//             console.log(err.response.data.message[0])
//             setErrors2(err.response.data.message[0])

//           })


//       } catch (err) {
//         console.log(err)
//       }

//     } else {
//       console.log(errors)
//     }
//   }, [errors]);



  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(user));
    setIsSubmitting(true);
  };








  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    

    if (!values.password) {
      errors.password = `${t('pass-err')}`;
    } else if (values.password.length < 7) {
      errors.password = `${t('pass-err-min')}`;
    }

    if (!values.re_password) {
        errors.re_password = "يرجى ادخال  كلمه المرور";
      }

    if (values.re_password !== values.re_password) {
        errors.re_password = " كلمه المرور غير متطابقه ";
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
        
        <div className="main-content" style={{ boxShadow: "0 0 15px #000" }}>
          <div className="main-content-logo" >
            <img src="./assets/mini-logo.png" alt="" className='img' />
          </div>
          <div className="main-content">
            <div className="main-content-form">
              <h3 style={{ marginBottom: "1rem" }}>تسجيل الدخول</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-login-container" style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl", textAlign: "right" } : { direction: "ltr", textAlign: "left" }}>

                  <div class="input" >
                  <label>كلمه المرور</label>
                    <input
                        style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                        type={showPassword ? 'text' : 'password'}
                        className={errors.password ? 'error-in' : ''}
                        placeholder="ادخل كلمه المرور"
                        value={user.password}
                        onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
                      />
                    <p className='error'>{errors.password}</p>
                  </div>

                  <div className="input">
                    <label> اعد ادخال كلمه المرور </label>
                    <div
                      className={`passwordcontainer ${errors.re_password ? 'error-in' : ''}`}
                      style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    >
                      <input
                        style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                        type='password'
                        className={errors.re_password ? 'error-in' : ''}
                        placeholder="ادخل كلمه المرور"
                        value={user.re_password}
                        onChange={(e) => { setUser({ ...user, re_password: e.target.value }) }}
                      />

                    </div>
                    <p className='error'>{errors.re_password}</p>
                  </div>

                </div>

                <input type="submit" value="تسجيل الدخول" />

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminReset