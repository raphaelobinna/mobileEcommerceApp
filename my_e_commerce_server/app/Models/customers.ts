import { DateTime } from 'luxon'
import { ProviderStatus } from 'Contracts/enum'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'

export default class customers extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public email: string

  @column()
  public provider_id: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public providers: ProviderStatus

  @column()
  public avatar_url: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (customers: customers) {
    if (customers.$dirty.password) {
      customers.password = await Hash.make(customers.password)
    }
  }
}
