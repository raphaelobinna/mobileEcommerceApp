import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { ProviderStatus } from 'Contracts/enum'

export default class CustomerProviders extends BaseSchema {
  protected tableName = 'customer_providers'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uid', 255).notNullable()
      table.enum('providers', Object.values(ProviderStatus)).notNullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
