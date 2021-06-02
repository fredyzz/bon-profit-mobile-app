import {RegisterFormData} from '../interfaces/registerFormData'

interface ValidationResponse {
    isValid: boolean,
    message: string
}

export const validateRegisterForm = ({name, lastName, phone, email, password, passwordRepeat}: RegisterFormData) : ValidationResponse => {
    let isValid : boolean = true;
    let message : string = 'success'; 

    if (!name || !lastName || !phone || !email || !password || !passwordRepeat) {
        isValid = false;
        message = 'Please fill in all the data'
        return { isValid, message } 
        }

    if(password !== passwordRepeat){
        isValid = false;
        message = `Password & Password confirmation don't match`
        return { isValid, message } 
    }

     if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))){
        isValid = false;
        message = 'Please write a valid email'
        return { isValid, message } 
     }

    return {isValid, message}

}

    