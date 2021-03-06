import {  useCallback, useContext, useState } from "react"
import React, { createContext } from 'react'
import ToastContainer from "../ToastContainer";
import { uuid } from "uuidv4";


export interface ToastMessage {
    type?: 'info' | 'success' | 'error';
    id: string;
    title: string;
    description?: string;
}

interface ToastData {
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
};



const ToastContex = createContext({} as ToastData);

const ToastProvider: React.FC = ({ children }) => {

    const [message, setMessage] = useState<ToastMessage[]>([])

    const addToast = useCallback(({ title, description, type }: Omit<ToastMessage, 'id'>) => {
        const id = uuid();

        const toast = {
            type,
            id,
            title,
            description
        }

        setMessage((oldState) => [...oldState, toast]) // pegando o antigo state e colocando o toast

    }, [])

    const removeToast = useCallback((id: string) => {

        setMessage(state => state.filter(state => state.id !== id))


    }, [])

    return (
        < ToastContex.Provider value={{ addToast, removeToast }}>
            { children}
            <ToastContainer messages={message} />
        </ToastContex.Provider >
    )

}


function useToast(): ToastData {

    const context = useContext(ToastContex)

    if (!context) {
        throw new Error('useToast must be used within a Toast Provider')
    }

    return context
}


export { useToast, ToastProvider }