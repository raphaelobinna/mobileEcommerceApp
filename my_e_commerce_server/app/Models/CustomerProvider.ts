import { DateTime } from 'luxon';
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm';
import { ProviderStatus } from 'Contracts/enum'


export default class CustomerProviders extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public uid: string

  @column()
  public providers: ProviderStatus

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
