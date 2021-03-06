import { ValidationError } from 'yup'

interface Errors {
    [key: string]: string
}

//TODO: PAY ATENTION LEARN MORE

export default function getValidationErrors(err: ValidationError): Errors {

    const validationsErros: Errors = {}

    err.inner.forEach(error => {
        validationsErros[error.path] = error.message
    })


    return validationsErros

}