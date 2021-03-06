import React, { useEffect } from 'react';
import { FiAlertCircle, FiXCircle, FiCheckCircle, FiInfo } from 'react-icons/fi'
import { ToastMessage } from '../../hooks/toast';
import { useToast } from '../../hooks/toast'

import { Container } from './styles'

interface ToastProps {
    message: ToastMessage,
    style: object;
}

const icons = {
    info: <FiInfo size={24} />,
    error: <FiAlertCircle size={24} />,
    success: <FiCheckCircle size={24} />
}


const Toast: React.FC<ToastProps> = ({ message, style }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            removeToast(message.id)
        }, 3000)

        return () => {
            clearTimeout(timer)  // esse return [e executado toda vez que o React desmonta esse componente]
        }
    }, [message.id])

    const { removeToast } = useToast()
    return (
        <Container style={style} type={message.type} hasdescription={Number(!!message.description)}>
            {icons[message.type || 'info']}
            <div>
                <strong>{message.title}</strong>
                <p>{message.description}</p>
            </div>
            <button onClick={() => removeToast(message.id)}><FiXCircle /></button>
        </Container>)

}

export default Toast;