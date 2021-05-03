'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Postulante extends Model {
    proyectos () {
        return this.hasMany('App/Models/Proyecto')
      }
}

module.exports = Postulante
