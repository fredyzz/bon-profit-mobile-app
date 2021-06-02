import axios from 'axios';
import {RegisterFormData} from '../interfaces/registerFormData'


export async function register(registerFormData : RegisterFormData ) : {} {

    const SIGN_UP_URL = 'http://localhost:4000/api/auth/signup'


    try {
        const {data} = await axios.post(
            SIGN_UP_URL,
            registerFormData
        )

        return {
            success: true
        }


    } catch (error) {
       return {
           success: false,
           message: 'Email is already taken'
           }
    }

}