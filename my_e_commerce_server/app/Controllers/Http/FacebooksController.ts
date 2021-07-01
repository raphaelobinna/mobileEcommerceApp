// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class FacebooksController {
    static async login(token:string)  {
        const fields = 'email,name,picture';
        const base_url = `https://graph.facebook.com/me?fields=${fields}`
        try {
            const res = await axios.get(`${base_url}&access_token=${token}`)
            console.log('res', res)
            if (res.status === 200) {
                return {status: 200, data: res.data}
            } else {
                return {status: 400, message: 'Facebook login not successful'}
            }
           } catch (error) {
            return {status: 400, message: error.message}
           }
    }
}
