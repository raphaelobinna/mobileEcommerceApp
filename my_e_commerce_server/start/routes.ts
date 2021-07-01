/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

//import CustomersController from 'App/Controllers/Http/CustomersController'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.post('/api/login/provider', 'CustomersController.Providerlogin')
Route.post('/api/register', 'CustomersController.register')
Route.post('/api/login', 'CustomersController.login')
Route.post('/api/dashboard', 'CustomersController.dashboard')
Route.get('/api/logout', 'CustomersController.logOut')