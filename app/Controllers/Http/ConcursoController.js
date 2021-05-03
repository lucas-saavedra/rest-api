'use strict'
const Concurso = use('App/Models/Concurso')
const Database = use('Database')
class ConcursoController {
     async index({
    }) {
       const concursos = await Concurso.all(); 
      //const concursos = await Database.from('adjudicatorios').where({ inscripcion_id: 1 })
      return concursos;
    } 

    async show ({ params}) {
      const {id} = params;
      const concurso = await Concurso.find(id);
      return concurso;
  
    } async estado ({params}) {
      const {estado} = params;
      return await Database.from('concursos').where(function () {
        this
          .where('concursos.estado', estado)
          
      })
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
