'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Licitacion extends Model {
    adjudicatorios () {
        return this.hasMany('App/Models/Adjudicatorio')
      }
}

module.exports = Licitacion
