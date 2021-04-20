'use strict'
const Proyecto = use('App/Models/Proyecto')
const AuthService = use('App/services/AuthService')
const Helpers = use('Helpers')
class ProyectoController {
  async index({
    auth
  }) {
    const user = await auth.getUser();
    return await user.proyectos().fetch();
  }
  async create({
    auth,
    request
  }) {
    const user = await auth.getUser();
    const {
      nombre
    } = request.all();
    const proyecto = new Proyecto();
    proyecto.fill({
      nombre
    });
    await user.proyectos().save(proyecto);
    return proyecto;
  }

  async upload({
    auth,
    request,
    params
  }) {
    const user = await auth.getUser();
    const photo = request.file('file')
    await photo.move(Helpers.tmpPath('photos'), {
      name:  user.email + `.jpg` ,
      overwrite: true
    })
  }


  async destroy({
    auth,
    params
  }) {
    const user = await auth.getUser();
    const {
      id
    } = params;
    const proyecto = await Proyecto.find(id);
    AuthService.VerifyPermission(proyecto, user);
    await proyecto.delete();
    return proyecto;
  }

  async update({
    auth,
    params,
    request
  }) {
    const user = await auth.getUser();
    const {
      id
    } = params;
    const proyecto = await Proyecto.find(id);
    AuthService.VerifyPermission(proyecto, user);
    proyecto.merge(request.only('nombre'));
    await proyecto.save();
    return proyecto;
  }

}

module.exports = ProyectoController
