'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdjudicatorioSchema extends Schema {
  up () {
    this.create('adjudicatorios', (table) => {
      table.increments()
      table.integer('concurso_id').unsigned().references('id').inTable('concursos')
      table.string('nombre_apellido', 255).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('cuit', 50).notNullable()
      table.string('cel', 50).notNullable()
      table.text('observaciones', 50)
      table.string('presup_oficial', 255).notNullable()
      table.string('inscripcion_id', 100).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('adjudicatorios')
  }
}

module.exports = AdjudicatorioSchema
