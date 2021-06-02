import {LoginFormData} from '../interfaces/loginFormData'

interface ValidationResponse {
    isValid: boolean,
    message: string
}

export const validateLoginForm = ({name, lastName, phone, email, password, passwordRepeat}: LoginFormData) : ValidationResponse => {
    let isValid : boolean = true;
    let message : string = 'success'; 

    if (!email || !password) {
        isValid = false;
        message = 'Please fill in all the data'
        return { isValid, message } 
        }

     if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
        isValid = false;
        message = 'Please write a valid email'
        return { isValid, message } 
     }

    return {isValid, message}

}
