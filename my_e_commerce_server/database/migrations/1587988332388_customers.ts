import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ProviderStatus } from 'Contracts/enum'

export default class CustomersSchema extends BaseSchema {
  protected tableName = 'customers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('first_name', 255).nullable()
      table.string('last_name', 255).nullable()
      table.string('email', 180).nullable().unique()
      table.string('provider_id', 255).unique()
      table.string('password', 180).nullable()
      table.enum('providers', Object.values(ProviderStatus)).defaultTo(ProviderStatus.NONE)
      table.string('avatar_url', 255).nullable()
      table.string('remember_me_token').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
