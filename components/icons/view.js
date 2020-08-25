import React from 'react'
import { COLOR } from '../../constants'

const ViewIcon = ({ className, color }) => (
  <svg
    className={className}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill={color || COLOR.BLACK}
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M16.8148 14.846H15.7967L15.4428 14.4967C16.693 13.0474 17.4534 11.1685 17.4534 9.10983C17.4534 4.53364 13.7219 0.824251 9.11854 0.824251C4.51514 0.824251 0.783691 4.53364 0.783691 9.10983C0.783691 13.686 4.51514 17.3954 9.11854 17.3954C11.1894 17.3954 13.0782 16.6408 14.5362 15.3992L14.8901 15.7485V16.7581L21.2989 23.1201L23.2108 21.2195L16.8148 14.846ZM9.11858 14.8459C5.93082 14.8459 3.3483 12.2786 3.3483 9.1097C3.3483 5.94206 5.93082 3.37353 9.11858 3.37353C12.3051 3.37353 14.8889 5.94206 14.8889 9.1097C14.8889 12.2786 12.3051 14.8459 9.11858 14.8459Z'
      fill='black'
    />
  </svg>
)

export default ViewIcon