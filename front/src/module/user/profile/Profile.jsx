import React from 'react'
import './profile.css'
import { Link } from 'react-router-dom'

import {GrAdd} from 'react-icons/gr'
import Unav from '../../../components/userNav/Unav'

const Profile = () => {
  return (
  <>
    
      <div className="profile-container">
          <div className="subnav">
            <Link>personal info</Link>
            <Link>personal info</Link>
          </div>
      </div>
  </>  
  )
}

export default Profile