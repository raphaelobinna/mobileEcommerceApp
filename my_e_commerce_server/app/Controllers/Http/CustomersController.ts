import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ProviderStatus } from 'Contracts/enum';
import Customer from 'App/Models/customers';
//import CustomersSchema from 'Database/migrations/1587988332388_customers';
//import CustomerProvider from 'App/Models/CustomerProvider';
import FacebooksController from 'App/Controllers/Http/FacebooksController'
import GooglesController from 'App/Controllers/Http/GooglesController'
import ExpiresController from './ExpiresController';
import BuildCustomersController from 'App/Controllers/Http/BuildCustomersController'
import ApiToken from 'App/Models/ApiToken';
//import { DateTime } from 'luxon';


export default class CustomersController {

    public async Providerlogin({ request, response, auth }: HttpContextContract) {
        const token = request.input("token");
        const provider = request.input("provider")
        if (provider !== ProviderStatus.FACEBOOK || ProviderStatus.GOOGLE){
            response.json({status: 400, message: 'Invalid input for provider field'})
        }
        let customerInfo;
        let customer;
        if(provider == ProviderStatus.FACEBOOK){
            const res = await FacebooksController.login(token)
            if(res.status === 200){
                customer = res.data
                //response.json({status: 201, data: customer})
            } else {
                response.json({status: 400, message: res.message})
            }
            
        } else if (provider == ProviderStatus.GOOGLE) {
            const resG = await GooglesController.login(token)
            if(resG.status === 200){
                customer = resG.data
                //response.json({status: 201, data: customer})
            } else {
                response.json({status: 400, message: resG.message})
            }
        }
         customerInfo = BuildCustomersController.buildCustomerInfo(customer, provider)
               
        const customerFind = await Customer.findBy('email', customerInfo.user.email)

        let jwtToken;

        if(!customerFind){
            const newCustomer = await Customer.create({
                first_name: customerInfo.user.first_name,
                last_name: customerInfo.user.last_name,
                email: customerInfo.user.email,
                avatar_url: customerInfo.user.avatarUrl,
                provider_id: customerInfo.providerInfo.uid,
                providers: customerInfo.providerInfo.type
            })

             jwtToken = await auth.use("api").generate(newCustomer, {
                expiresIn: "30mins",
              });
              response.json({status: 201, data: newCustomer, token: jwtToken.toJSON()})

        }else  {
            if(customerFind.providers !== customerInfo.providerInfo.type) {
                customerFind.providers = customerInfo.providerInfo.type
                customerFind.provider_id = customerInfo.users.provider_id
                await customerFind.save()
                console.log('hitter 4')
               

                jwtToken = await auth.use("api").generate(customerFind, {
                    expiresIn: "30mins",
                  });
                  response.json({status: 201, data: customerFind, token: jwtToken.toJSON()})
            } else {
                console.log('hitter 3')

                jwtToken = await auth.use("api").generate(customerFind, {
                    expiresIn: "30mins",
                  });
                  response.json({status: 201, data: customerFind, token: jwtToken.toJSON()})
            }
        }
       
      
        
        

       
       
      }

      public async register({ request, auth, response }: HttpContextContract) {
        const email = request.input("email");
        const password = request.input("password");
        const firstName = request.input("firstName");
        const lastName = request.input("lastName");
        console.log('passed2')
        const user = await Customer.create({
            first_name: firstName,
            last_name: lastName,
            email,
            password
        })
        console.log(user)
        // const newUser = new Customer();
        // newUser.email = email;
        // newUser.password = password;
        // newUser.firstName= firstName;
        // newUser.lastName = lastName
        console.log('passed1')
        //await newUser.save();
        
        const token = await auth.use("api").generate(user, {
          expiresIn: "30mins",
        });
        console.log(token)
        response.json({status: 201, data: user, token: token.toJSON()})
      }

      public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input("email");
        const password = request.input("password");
        const token = await auth.attempt(email, password, {
            expiresIn: "30mins"
        });
        const expiry = await ApiToken.query()
                                        .where('customer_id', auth.user!.id)
                console.log(expiry)
                for (let i = 0; i < expiry.length; i++) {
                    const element = expiry[i];
                    console.log('element', element)
                    const expiryReturn = ExpiresController.expiryCheck(expiry[i].createdAt.toISO(), expiry[i].expiresAt.toISO())
                    console.log(expiryReturn)
                if (expiryReturn === true){
                    await ApiToken.query()
                                    .where('id', expiry[i].id)
                                    .delete()
                }
                }
                

        console.log(token)
        //await auth.use('basic').authenticate()
        response.json({status: 201, data: auth.user!, token: token.toJSON()})
      }

      public async dashboard({ auth, response}: HttpContextContract) {
        
         await auth.use('api').authenticate()
       
        response.json({status: 201, data: auth.user!})
      }

      public async logOut({auth, response}: HttpContextContract) {
          await auth.use("api").logout()
        // await auth.use('api').authenticate()

        // const expiry = await ApiToken.query()
        //                                 .where('customer_id', auth.user!.id)
        //         console.log(expiry)
        //         for (let i = 0; i < expiry.length; i++) {
        //             const element = expiry[i];
        //             console.log('element', element)
               
        //             await ApiToken.query()
        //                             .where('id', expiry[i].id)
        //                             .delete()
        //         }
        response.json({status: 201, message: 'Successfully logged Out'})
      }

}
