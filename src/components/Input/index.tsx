import React, { InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'

import { Container, Error } from './style'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'

import { useField } from "@unform/core"




interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string;
    icon?: React.ComponentType<IconBaseProps>;   // this part is in order to the Icon gets the same props as A react Icon
}

const Input: React.FC<InputProps> = ({ name, icon: Icon, ...rest }) => {


    //----------- HOOKS
    const { defaultValue, registerField, fieldName, error } = useField(name)
    const inputReff = useRef<HTMLInputElement>(null)


    //----------- STATE
    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)


    //----------- FUNCTIONS    
    const handleFocus = useCallback(() => {

        setIsFocused(true)

    }, [])

    const handleBlur = useCallback(() => {
        setIsFocused(false)


        setIsFilled(!!inputReff.current?.value) // transforma em tru ou false

    }, [])



    useEffect(() => {

        registerField({
            name: fieldName,
            ref: inputReff.current,
            path: 'value'


        })

    }, [fieldName, registerField])

    return (

        <Container isError={!!error} isFilled={isFilled} isFocused={isFocused}>

            {Icon && <Icon size={20} />}

            <input onFocus={handleFocus} onBlur={handleBlur} ref={inputReff} {...rest} />
            {error && <Error title={error} > <FiAlertCircle size={20} color="#c53030" /></Error>}
        </Container>

    )

}


export default Input