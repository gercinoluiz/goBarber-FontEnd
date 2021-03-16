import React, { useCallback, useRef, useState } from "react"
import logoImg from "../../assets/logo.png"
import { Container, Content, Background } from "./styles"
import { FiLogIn, FiMail } from "react-icons/fi"
import Input from "../../components/Input"
import Button from "../../components/Button"
import { Form } from "@unform/web" // bets form ever
import { FormHandles } from "@unform/core" // bets form ever
import * as Yup from "yup"
import getValidationErrors from "../../utils/getValidationErrors"
import { useAuth } from '../../hooks/auth'

import { useToast } from "../../hooks/toast"
import { Link, useHistory } from "react-router-dom"
import api from '../../services/api';



interface formDataFormatSignin {
    password: string;
    email: string;
}


const ForgotPassword: React.FC = () => {

    const formRef = useRef<FormHandles>(null)

    const [loading, setLoading] = useState(false)

    const { addToast } = useToast()
    const history = useHistory()




    const handleSubmit = useCallback(async (data: formDataFormatSignin) => {

        try {
            setLoading(true)

            formRef.current?.setErrors({})

            const YupSchema = Yup.object().shape({
                email: Yup.string().required("Email Obrigatório").email("Digite um email válido"),

            })

            await YupSchema.validate(data, {
                abortEarly: false
            })

            await api.post('/password/forgot',{
                email: data.email
            })

            addToast({ title: 'Caso o e-mail digitado exista, você receberá no endereço cadastrado as instruções para recuperação de senha', description: '', type: 'success' })

            history.push('/')

        } catch (error) {

            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error)

                formRef.current?.setErrors(errors)
            }


            addToast({ title: 'Erro de autenticação', description: 'Confira suas credenciais', type: 'error' })


        }finally{
            setLoading(false)
        }


    }, [ addToast, history])

    return (
        <Container>
            <Content>
                <img src={logoImg} alt="You Barber"></img>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>
                        Recuperar senha
                    </h1>
                    < Input name="email" icon={FiMail} placeholder="E-mail" />

                    <Button loading={loading} type="submit" >Recuperar senha</Button>
                </Form>


                <Link to="/">  <FiLogIn /> Voltar ao login</Link>

            </Content>
            <Background></Background>
        </Container>

    )
}


export default ForgotPassword