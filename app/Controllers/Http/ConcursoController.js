'use strict'
const Concurso = use('App/Models/Concurso')
class ConcursoController {
    async index({
    }) {
      const concursos = await Concurso.all();
      return concursos;
    }
    async create({
      request
    }) {
      const {
          anio,
          concurso_n,
          titulo,
          llamada,
          tipo_licitacion,
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
        anio,
        licitacion_n,
        titulo,
        llamada,
        tipo_licitacion,
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

module.exports = ConcursoController
