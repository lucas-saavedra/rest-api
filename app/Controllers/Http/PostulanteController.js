'use strict'
const Postulante = use('App/Models/Postulante');
const Database = use('Database')
const User = use('App/Models/User');
const Helpers = use('Helpers')
const fs = require("fs");



class PostulanteController {
  async tipo({
    params
  }) {
    const {
      tipo
    } = params;
    return await Database.from('postulantes').where(function () {
      this
        .where('postulantes.tipo', tipo)
  
    })
  }
  async create({
    request
  }) {
    const {
      inscripcion_id,
      tipo,
      nombre_apellido,
      email,
      cuit,
      cel
    } = request.all();
    const postulante = new Postulante();
    postulante.fill({
      inscripcion_id,
      tipo,
      nombre_apellido,
      email,
      cuit,
      cel
    });
    

    const archivo = request.file('file', {
      types: ['zip', 'x-zip-compressed', 'rar'],
      size: '15mb'
    })
    await archivo.move(Helpers.appRoot('archivos/' + tipo), {
      name: inscripcion_id + '_' + postulante.id + '_' + postulante.cuit + `.zip`,
      overwrite: true
    })
    if (!archivo.moved()) {
      return archivo.error()
    }
    else{
      await postulante.save(); 
      return postulante; 
    }
   
    /* const archivo = request.file('file', {
      types: ['zip','x-zip-compressed','rar'],
      size: '15mb'
    })
    await archivo.move(Helpers.appRoot('archivos/'+tipo), {
      name:  inscripcion_id+'_'+ postulante.id + '_' + postulante.cuit + `.zip`,
      overwrite: true
    })
    if (!archivo.moved()) {
      return archivo.error()
    } */

   

  }
}

module.exports = PostulanteController
