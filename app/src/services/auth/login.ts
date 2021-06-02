import axios from 'axios';



export async function login(email: String, password: String) : {} {

    const LOGIN_URL = 'http://localhost:4000/api/auth/login'
    const USER_URL = 'http://localhost:4000/api/user'


    try {
        const {data: {token, refreshToken}} = await axios.post(LOGIN_URL,
        {
          email,
          password
      })

        if(token) {
            const config = {
            headers: { Authorization: `Bearer ${token}` }
            };
          
            const {data: {user}} = await axios.get(USER_URL,config)

            return {
            success: true,
            message: 'Logged succesfully',
            token,
            refreshToken,
            user: {
                name: user.name,
                lastname: user.lastname,
                avatar: user.avatarUrl ? user.avatarUrl : undefined
            }


        }
        }


    } catch (error) {
       return {
           success: false,
           message: 'Wrong credentials'
       }
    }

}