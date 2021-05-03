'use strict'
const Postulante = use('App/Models/Postulante');
 
const User = use('App/Models/User');
const Helpers = use('Helpers')
const fs = require("fs");
class PostulanteController {
    async create({
        request
      }) {
        const {
          inscripcion_id,
          tipo,
          nombre_apellido,
         email,
          cuit
        } = request.all();
        const postulante = new Postulante();
        postulante.fill({
          inscripcion_id,
          tipo,
          nombre_apellido,
        email,
          cuit
        });
        await postulante.save();

        const archivo = request.file('file', {
          types: ['zip'],
          size: '5mb'
        })
        await archivo.move(Helpers.appRoot('archivos/'+tipo), {
          name:  inscripcion_id+'_'+ postulante.id + '_' + postulante.cuit + `.zip`,
          overwrite: true
        })
        if (!archivo.moved()) {
          return archivo.error()
        }

        return postulante;
      
      }
}

module.exports = PostulanteController
