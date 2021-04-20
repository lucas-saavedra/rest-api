'use strict'
const Licitacion = use('App/Models/Licitacion')
class LicitacionController {

  async show ({ params, request}) {
    const {id} = params;
    const licitacion = await Licitacion.find(id);
    return licitacion;

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
        fecha,
        licitacion_n,
        titulo,
        llamada,
        tipo,
        decreto,
        entrega_sobres,
        org_financiero,
        fecha_apertura,
        presup_oficial,
        precio_pliego,
        bases_condiciones,
        fecha_adj,
        norma_adj,
        estado
    } = request.all();
    const licitaciones = new Licitacion();
    licitaciones.fill({
      fecha,
      licitacion_n,
      titulo,
      llamada,
      tipo,
      decreto,
      entrega_sobres,
      org_financiero,
      fecha_apertura,
      presup_oficial,
      precio_pliego,
      bases_condiciones,
      fecha_adj,
      norma_adj,
      estado
    });
    return await licitaciones.save();
  }
  
}

module.exports = LicitacionController
