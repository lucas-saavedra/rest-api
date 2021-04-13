'use strict'
const Proyecto = use('App/Models/Proyecto');
const Tarea = use('App/Models/Tarea');
const AuthService = use('App/services/AuthService')

class TareaController {
  async index({
    auth,
    request,
    params
  }) {
    const user = await auth.getUser();
    const {descripcion} = request.all();
    const {id} = params;
    const proyecto = await Proyecto.find(id);
    AuthService.VerifyPermission(proyecto,user);
    return await proyecto.tareas().fetch();
  }

  async create({
    auth,
    request,
    params
  }) {
    const user = await auth.getUser();
    const {descripcion} = request.all();
    const {id} = params;
    const proyecto = await Proyecto.find(id);
    AuthService.VerifyPermission(proyecto,user);
    const tarea = new Tarea();
    tarea.fill({
      descripcion
    });
    await proyecto.tareas().save(tarea);
    return tarea;
  }

  async destroy({
    auth,
    params
  }) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    const proyecto = await tarea.proyecto().fetch();
    AuthService.VerifyPermission(proyecto, user);
    await tarea.delete();
    return proyecto;
  }

  async update({auth, params, request}) {
    const user = await auth.getUser();
    const { id } = params;
    const tarea = await Tarea.find(id);
    const proyecto = await tarea.proyecto().fetch();
    AuthService.VerifyPermission(proyecto, user);
    tarea.merge(request.only([
      'descripcion',
      'completada'
    ]));
    await tarea.save();
    return tarea;
  }

}

module.exports = TareaController
