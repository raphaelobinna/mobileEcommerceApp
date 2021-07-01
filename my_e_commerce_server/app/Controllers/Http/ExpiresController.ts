// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import { DateTime } from 'luxon'


export default class ExpiresController {
    static expiryCheck(created_at: string, expires_at: string) {
        console.log('created_at',created_at)
        console.log('expires_at', expires_at)
        var createdAtmilli = new Date(created_at).getTime()/1000;
        var expiresAtmilli = new Date(expires_at).getTime()/1000;
        var currentDatemilli = new Date().getTime()/1000;

        const expiry = expiresAtmilli - createdAtmilli
        const expiryDuration = currentDatemilli - createdAtmilli
        console.log('expiry', expiry)
        console.log('expiry_duration', expiryDuration)
        if(expiry > expiryDuration) {
            return false
        } else {
            return true
        }
    }
}
