'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Adjudicatorio extends Model {
    concurso () {
        return this.belongsTo('App/Models/Concurso')
      }
}

module.exports = Adjudicatorio
