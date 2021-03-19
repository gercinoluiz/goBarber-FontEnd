import React, { useCallback, useRef, useState } from "react"

import logoImg from "../../assets/logo.png"
import { Container, Content, Background,  IsProviderContainer } from "./styles"
import { FiMail, FiLock, FiUser, FiArrowLeft } from "react-icons/fi"
import { AiFillCheckCircle} from "react-icons/ai"
import Input from "../../components/Input"
import Button from "../../components/Button"

import * as Yup from "yup"

import { Form } from "@unform/web" // bets form ever
import { FormHandles } from "@unform/core" // bets form ever
import getValidationErrors from "../../utils/getValidationErrors"
import { Link, useHistory } from "react-router-dom"
import api from "../../services/api"
import { useToast } from "../../hooks/toast"


interface SignUpData {
    email: string;
    password: string;
    name: string
    isProvider:boolean
}

const SignUp: React.FC = () => {

    const [checked, setChecked] = useState(false)

    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const hystory = useHistory()

    const handleSubmit = useCallback(async (data: SignUpData) => {


        try {
            // I pass null because if it get an error at once it wont erase the mesage
            formRef.current?.setErrors({})


            const YupSchema = Yup.object().shape({
                name: Yup.string().required("Nome Obrigatório"),
                email: Yup.string().required("Email Obrigatório").email("Digite um email válido"),
                password: Yup.string().required("Senha Obrigatória").min(6, 'No mínimo 6 dígitos')
            })

       

            await YupSchema.validate(data, {
                abortEarly: false
            })
           console.log({checked})

            data.isProvider = checked;

            await api.post('/users', data)

            hystory.push('/')

        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)

                formRef.current?.setErrors(errors)
            }

            addToast({ title: 'Erro ao criar cadastro.', description: 'Tente novamente', type: 'error' })

        }


    }, [addToast, hystory, checked]
    )

    const handleChekcBoxChange = useCallback(() => {
        setChecked(!checked)
    
    }, [checked])
    return (
        <Container>
            <Background />

            <Content>
                <img src={logoImg} alt="You Barber"></img>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>
                        Crie sua conta
                    </h1>
                    < Input name="name" icon={FiUser} placeholder="Nome" />
                    < Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <IsProviderContainer onClick={handleChekcBoxChange} checked={checked}>

                    
                            <AiFillCheckCircle size={22} />
               
                        <p>Sou Barbeiro</p>
                    </IsProviderContainer>
                    <Button type="submit"  >Criar conta</Button>

                </Form>


                <Link to="/">  <FiArrowLeft /> Voltar</Link>

            </Content>
        </Container>

    )
}


export default SignUp