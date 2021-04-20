'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ConcursoSchema extends Schema {
  up() {
    this.create('concursos', (table) => {
      table.increments()
      table.date('fecha').notNullable()
      table.string('concurso_n', 255).notNullable()
      table.text('titulo').notNullable()
      table.string('decreto_llamado', 255)
      table.date('fecha_adj')
      table.text('norma_adj')
      table.enu('estado', ['vigente', 'adjudicada', 'en_evaluacion']).notNullable()
      table.text('entrega_sobres').notNullable()
      table.string('org_financiero', 255)
      table.text('fecha_apertura_sobres').notNullable()
      table.string('presup_oficial', 255).notNullable()
      table.string('precio_pliego', 255).notNullable()
      table.integer('pliego_id')
      table.text('bases_condiciones').notNullable()
      table.integer('bases_condiciones_id')
      table.timestamps()
     
    })
  }

  down() {
    this.drop('concursos')
  }
}

module.exports = ConcursoSchema
