import React, { useCallback, useRef } from "react"
import logoImg from "../../assets/logo.png"
import { Container, Content, Background } from "./styles"
import { FiLogIn, FiMail, FiLock } from "react-icons/fi"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { Form } from "@unform/web" // bets form ever
import { FormHandles } from "@unform/core" // bets form ever
import * as Yup from "yup"
import getValidationErrors from "../../utils/getValidationErrors"
import { useAuth } from '../../hooks/auth'

import { useToast } from "../../hooks/toast"
import { Link, useHistory } from "react-router-dom"



interface formDataFormatSignin {
    password: string;
    email: string;
}


const Signin: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const { signIn } = useAuth()
    const { addToast } = useToast()
    const history = useHistory()




    const handleLogin = useCallback(async (data: formDataFormatSignin) => {

        try {

            formRef.current?.setErrors({})

            const YupSchema = Yup.object().shape({
                email: Yup.string().required("Email Obrigatório").email("Digite um email válido"),
                password: Yup.string().required("Senha Obrigatória")

            })

            await YupSchema.validate(data, {
                abortEarly: false
            })

            await signIn({ email: data.email, password: data.password })

            addToast({ title: 'Login realizado com sucesso', description: '', type: 'success' })

            history.push('/dashboard')

        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)

                formRef.current?.setErrors(errors)
            }


            addToast({ title: 'Erro de autenticação', description: 'Confira suas credenciais', type: 'error' })


        }


    }, [signIn, addToast, history])

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="You Barber"></img>

                <Form ref={formRef} onSubmit={handleLogin}>
                    <h1>
                        Faça seu Login
                    </h1>
                    < Input name="email" icon={FiMail} placeholder="E-mail" />
                    <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
                    <Button type="submit" >Entrar</Button>

                    <Link to="/forgot-password">Esqueci a senha</Link>
                </Form>


                <Link to="/signup">  <FiLogIn /> Criar conta</Link>

            </Content>
            <Background></Background>
        </Container>

    )
}


export default Signin