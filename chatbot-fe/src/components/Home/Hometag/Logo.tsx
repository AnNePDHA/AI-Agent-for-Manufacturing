import React from 'react'
import {FireFilled} from '@ant-design/icons'
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className='logo-home'>
        <div className='logo-icon-home'>
            <Link to="http://localhost:3000/homeContent">
              <img src={"https://cdn1.vieclam24h.vn/tvn/images/default/2022/09/13/images/166303868678.png"} alt="Logo" style={{marginTop: '60px', width: '110%' }}/>
            </Link>
        </div>
    </div>
  )
}

export default Logo