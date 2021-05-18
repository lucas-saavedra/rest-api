'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConcursoSchema extends Schema {
  up() {
    this.create('concursos', (table) => {
      table.increments()
      table.date('fecha').notNullable()
      table.string('anio',4).notNullable()
      table.string('numero', 255).notNullable()
      table.text('titulo').notNullable()
      table.string('decreto_llamado', 255)
      table.date('fecha_adj')
      table.text('norma_adj')
      table.enu('estado', ['vigente', 'adjudicada', 'en_evaluacion']).notNullable()
      table.text('entrega_sobres').notNullable()
      table.text('fecha_apertura_sobres')
      table.string('presup_oficial', 255).notNullable()
      table.text('bases_condiciones')
      table.integer('bases_condiciones_id')
      table.json('adjudicatorios_importe')

      table.timestamps()
     
    })
  }

  down() {
    this.drop('concursos')
  }
}

module.exports = ConcursoSchema
