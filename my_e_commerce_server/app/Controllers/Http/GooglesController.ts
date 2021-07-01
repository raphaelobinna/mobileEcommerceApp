// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import axios from 'axios'

export default class GooglesController {
    static async login(token:string)  {
        const base_url = `https://www.googleapis.com/userinfo/v2/me`
        try {
            const res = await axios.get(base_url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('res', res)
            if (res.status === 200) {
                return {status: 200, data: res.data}
            } else {
                return {status: 400, message: 'Google login not successful'}
            }
           } catch (error) {
            return {status: 400, message: error.message}
           }
    }
}
