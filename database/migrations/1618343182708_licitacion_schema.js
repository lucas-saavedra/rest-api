'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LicitacionSchema extends Schema {
  up() {
    this.create('licitacions', (table) => {
      table.increments()
      table.date('fecha').notNullable()
      table.string('anio',4).notNullable()
      table.string('numero', 255).notNullable()
      table.string('titulo', 255).notNullable()
      table.string('llamada', 50).notNullable()
      table.enu('tipo', ['publica','privada']).notNullable()
      table.string('decreto', 255).notNullable()
      table.text('entrega_sobres')
      table.string('org_financiero', 255)
      table.text('fecha_apertura').notNullable()
      table.string('presup_oficial', 255).notNullable()
      table.string('precio_pliego', 255).notNullable()
      table.text('bases_condiciones')
      table.integer('bases_condiciones_id')
      table.text('fecha_adj')
      table.text('norma_adj')
      table.integer('pliego_id')
      table.enu('estado', ['vigente','adjudicada','en_evaluacion']).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('licitacions')
  }
}

module.exports = LicitacionSchema
