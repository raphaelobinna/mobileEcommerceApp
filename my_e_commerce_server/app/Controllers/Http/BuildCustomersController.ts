// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ProviderStatus } from 'Contracts/enum';


export default class BuildCustomersController {
    static  buildCustomerInfo(info, providerName: string)  {
        console.log('provider', providerName)
        console.log('info', info)

        let providerInfo = {
            uid: '',
            type: ProviderStatus.GOOGLE || ProviderStatus.FACEBOOK
        }
        
        let user = {
            email: '',
            first_name: '',
            last_name: '',
            avatarUrl: '',
            provider_id: ''
        }

        if (providerName === ProviderStatus.GOOGLE) {
            providerInfo.uid = info.id;
            providerInfo.type = ProviderStatus.GOOGLE
            user.email = info.email;
            user.avatarUrl = info.picture;
            user.provider_id = info.id
            user.first_name = info.given_name;
            user.last_name = info.family_name;

            return {user, providerInfo}
        } else if (providerName === ProviderStatus.FACEBOOK) {
            const [firstName, ...lastName] =  info.name.split(' ');

            user.first_name = firstName;
            user.last_name = lastName.join(' ');
            providerInfo.uid = info.id;
            providerInfo.type = ProviderStatus.FACEBOOK;
            user.provider_id = info.id;
            user.email = info.email ? info.email : ''
            user.avatarUrl = info.picture.data.url ? info.picture.data.url : '';
    
            return {user, providerInfo}
        }

        return {user, providerInfo}
    }
}
