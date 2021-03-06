import React, { ButtonHTMLAttributes } from 'react'

import {Container} from './style'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
       loading?:boolean
}


const Button:React.FC <ButtonProps>  = ({children, loading ,...rest}) => {

       console.log(loading)

       return (

       <Container {...rest} >{ loading ?  'Carregando...': children}</Container> 

       )
}


export default Button