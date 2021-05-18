'use strict'
const Licitacion = use('App/Models/Licitacion')
const Database = use('Database')
const Helpers = use('Helpers')
const fs = require("fs");
class LicitacionController {

  async show({
    params
  }) {
    const {
      id
    } = params;
    const licitacion = await Licitacion.find(id);
    return licitacion;

  }
  async estado({
    params
  }) {
    const {
      estado
    } = params;
    return await Database.from('licitacions').where(function () {
      this
        .where('licitacions.estado', estado)

    })
  }

  async index({

  }) {
    const licitaciones = await Licitacion.all();
    return licitaciones;
  }


  async create({
    request
  }) {
    const {
      numero,
      estado,
      titulo,
      llamada,
      tipo,
      decreto,
      anio,
      fecha_apertura,
      presup_oficial,
      precio_pliego,
      org_financiero,
      /*  entrega_sobres,
       
       
       
       
       bases_condiciones,
       fecha_adj,
       norma_adj, */

    } = request.all();
    const licitaciones = new Licitacion();
    licitaciones.fill({
      anio,
      fecha_apertura,
      numero,
      estado,
      titulo,
      llamada,
      tipo,
      decreto,
      presup_oficial,
      precio_pliego,
      org_financiero,
      /*    entrega_sobres,
         
         fecha_apertura,
         
         
         bases_condiciones,
         fecha_adj,
         norma_adj,
         */
    });
    const pliego = request.file('pliego', {
      types: ['zip', 'x-zip-compressed', 'rar'],
      size: '15mb'
    })
    await pliego.move(Helpers.appRoot('archivos/' + numero + '/' + llamada), {

      name: 'pliego.zip',
      overwrite: true
    })
    const bases = request.file('bases', {
      types: ['zip', 'x-zip-compressed', 'rar'],
      size: '15mb'
    })
    await bases.move(Helpers.appRoot('archivos/' + numero + '/' + llamada), {

      name: 'bases.zip',
      overwrite: true
    })

    if (!pliego.moved() && !bases.moved()) {
      return pliego.error(), bases.error()

    } else {
      return await licitaciones.save();
    }

  }

}
/*  const archivos = request.file('file', {
    types: ['zip', 'x-zip-compressed', 'rar'],
    size: '15mb'
  })
  await archivos.moveAll(Helpers.appRoot('archivos/'+ numero +'/'+llamada), (file) => {
      return {
        
        overwrite: true
  }})

    if (!archivos.movedAll()) {
      return archivos.error()
    } else {
      return await licitaciones.save();
    } */
module.exports = LicitacionController
