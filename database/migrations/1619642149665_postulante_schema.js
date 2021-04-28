'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostulanteSchema extends Schema {
  up () {
    this.create('postulantes', (table) => {
      table.increments()
      table.enu('tipo', ['licitacion','concurso']).notNullable()
      table.string('inscripcion_id', 100)
      table.string('nombre_apellido', 255).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('cuit', 50)
      table.string('cel', 50)
      table.text('observaciones', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('postulantes')
  }
}

module.exports = PostulanteSchema