import React from 'react'
import { COLOR } from '../../constants'

//className is to allow styles to be passed to the component
const EditIcon = ({className, color}) => (
    <svg className={className} width="28" height="28" viewBox="0 0 35 35" fill={color || COLOR.WHITE} xmlns="http://www.w3.org/2000/svg">
        <path d="M25.9536 19.8357L27.6203 18.1813C27.8807 17.9228 28.3338 18.1037 28.3338 18.476V25.9934C28.3338 27.3635 27.214 28.475 25.8338 28.475H7.50005C6.11982 28.475 5 27.3635 5 25.9934V7.79445C5 6.42436 6.11982 5.31277 7.50005 5.31277H21.7452C22.115 5.31277 22.3025 5.75741 22.042 6.02108L20.3753 7.67553C20.2972 7.75308 20.193 7.79445 20.0785 7.79445H7.50005V25.9934H25.8338V20.1253C25.8338 20.0167 25.8755 19.9133 25.9536 19.8357ZM34.11 9.40236L20.4326 22.9792L15.7242 23.4962C14.3596 23.6461 13.1981 22.5035 13.3491 21.1386L13.87 16.4648L27.5474 2.88797C28.7401 1.70401 30.6672 1.70401 31.8547 2.88797L34.1048 5.12148C35.2975 6.30544 35.2975 8.22357 34.11 9.40236ZM28.9641 10.9999L25.938 7.99608L16.2607 17.6074L15.8804 20.9835L19.2816 20.6061L28.9641 10.9999ZM32.3391 6.87933L30.0891 4.64582C29.8755 4.43385 29.5266 4.43385 29.3182 4.64582L27.7088 6.2434L30.7349 9.24726L32.3443 7.64968C32.5527 7.43253 32.5527 7.0913 32.3391 6.87933Z" />
    </svg>
)

export default EditIcon