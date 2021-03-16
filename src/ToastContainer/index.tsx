import React from "react"

import { Container } from './styles'
import { ToastMessage } from '../hooks/toast'

import Toast from './Toast'
import { useTransition } from "react-spring"

interface ToastContainerProps {
    messages: ToastMessage[];

}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {


    const messagesWithTransitions = useTransition(messages, (messages) => messages.id, {
        from: { right: '-110%' },
        enter: { right: '0%' },
        leave: { right: '-110%' }
    })


    return (<Container>
        {
            messagesWithTransitions.map(({ item, key, props }) => (

                <Toast key={key} message={item} style={props}>


                </Toast>
            ))
        }

    </Container>)
}


export default ToastContainer;
