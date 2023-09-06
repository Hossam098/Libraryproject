import { useState, useEffect } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import Toggle from '../../../components/togglrLang/Toggle';
import './register.css'
import { useTranslation } from 'react-i18next';
import { API_URL } from '../../../config';
import axios from 'axios'
import { use } from 'i18next';
import { useNavigate } from 'react-router-dom';
import PopupError from '../../../components/error/PopupError';
import { Link } from 'react-router-dom';


const Register = () => {

  const navigate = useNavigate();
  const [logged, setLogged] = useState(true);
  const [t] = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors2, setErrors2] = useState('');

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    checkpassword: "",
    national_id: "",
    phone: "",
    nationality: "",
    university: "",
    other_uni: "",
    faculity: "",
    department: "",
  })


  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  const handleCloseError = () => {
    setErrors2('');
  };



  useEffect(() => {
    axios.get(`${API_URL}/auth/check`, { withCredentials: true })
      .then((res) => {
        console.log(res)
        setLogged(true)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        setLogged(false)

      })
    if (Object.keys(errors).length === 0 && isSubmitting) {
      axios.defaults.withCredentials = true;
      axios.post(`${API_URL}/auth/register`, user, { withCredentials: true })
        .then((res) => {
          console.log("logged");
          console.log(res);
          navigate('/login');
        })
        .catch((err) => {
          console.log(err.response.data.message[0]);
          setErrors2(err.response.data.message[0]);
        });
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(user));
    setIsSubmitting(true);
  };


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
    } else if (!regex.test(values.email) || !values.email.includes('.edu')) {
      errors.email = `${t('email-t-err')}`;
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
    if (!values.nationality) {
      errors.nationality = `${t('nation-err')}`
    }
    if (!values.university) {
      errors.university = `${t('uni-err')}`
    }
    if (values.university === "0") {
      if (!values.other_uni) {
        errors.other_uni = `${t('uni-err')}`
      }
    }
    if (!values.faculity) {
      errors.faculity = `${t('fac-err')}`
    }
    if (!values.department) {
      errors.department = `${t('dep-err')}`
    }
    if (!values.checkpassword) {
      errors.checkpassword = `${t('re-pass-err')}`
    } else if ((values.checkpassword !== values.password)) {
      errors.checkpassword = `${t('pass-match-err')}`
    }



    return errors;
  }
  return (
    <div className="main">
      {errors2 && (
        <PopupError
          message={errors2}
          onClose={handleCloseError}
        />
      )}
      {/* <div className="main-image">
        <img src="./assets/uni-logo.png" alt="" />
      </div> */}

      <div className="main-content" style={{boxShadow: "0 0 15px #000"}}>
        <div className="main-content-logo">
          <img src="./assets/mini-logo.png" alt="" />
        </div>
        <div class="main-content">
          <div class="main-content-form">
            <h3>{t('cerate')}</h3>
            <form onSubmit={handleSubmit}>
              <div className="input-container" style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl", textAlign: "right" } : { direction: "ltr", textAlign: "left" }}>


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
                    className={errors.nationality ? 'error-in' : ''}
                    placeholder={t('e-nation')}
                    value={user.nationality}
                    onChange={(e) => { setUser({ ...user, nationality: e.target.value }) }}
                  />
                  <p className='error'>{errors.nationality}</p>
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
                  <label>{t('dep')} </label>
                  <input
                    style={localStorage.getItem('i18nextLng') == "ar" ? { direction: "rtl" } : { direction: "ltr" }}
                    type="text"
                    className={errors.department ? 'error-in' : ''}
                    placeholder={t('e-dep')}
                    value={user.department}
                    onChange={(e) => { setUser({ ...user, department: e.target.value }) }}
                  />
                  <p className='error'>{errors.department}</p>
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
                      {showPassword ? <HiEyeOff style={{ color: "#19355A" }} /> : <HiEye style={{ color: "#19355A" }} />}
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
              <input type="submit" value={t('create')} style={{ marginBottom: "1rem" }} />
            </form>

            <Link to="/login" className="link">{t('login-link')}</Link>


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