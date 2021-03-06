
import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { useToast } from '../../hooks/toast';
import { useHistory, useLocation } from 'react-router-dom';
import { useCallback } from 'react';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { Form } from '@unform/web';
import Input from '../../components/Input/index';
import { FiLock } from 'react-icons/fi';
import Button from '../../components/Button/index';
import logoImg from "../../assets/logo.png"
import { Container, Content, Background } from "./styles"
import api from '../../services/api';


interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}



const ResetPassword: React.FC = () => {

  const location = useLocation()

  const formRef = useRef<FormHandles>(null)

  const { addToast } = useToast()

  const history = useHistory()

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {

    try {
      formRef.current?.setErrors({})
      const schema = Yup.object().shape({
        password: Yup.string().required('Senha obrigatória'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password')],
          'Confirmação incorreta',
        ),
      })

      await schema.validate(data, {
        abortEarly: false
      })


      const token = location.search.replace(`?token=`, '')

      api.post(`/password/reset`, {
        password: data.password,
        password_confirmation: data.password_confirmation,
        token
      })

      history.push('/')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Erro ao resetar senha',
        description: 'Ocorreu um erro ao resetar sua senha, tente novamente.',
      });
    }
  }, [addToast, history, location.search])


  return (
    <Container>
      <Content>

        <img src={logoImg} alt="You Barber"></img>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Resetar senha</h1>

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmação da senha"
          />

          <Button type="submit">Alterar senha</Button>
        </Form>
      </Content>

      <Background></Background>
    </Container>
  );

}


export default ResetPassword