'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LicitacionSchema extends Schema {
  up () {
    this.create('licitacions', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('licitacions')
  }
}

module.exports = LicitacionSchema
