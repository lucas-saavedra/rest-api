'use strict'
const Proyecto = use('App/Models/Proyecto')
const Postulante = use('App/Models/Postulante')
const AuthService = use('App/services/AuthService')
const Helpers = use('Helpers')
const fs = require("fs");

const readdir = Helpers.promisify(fs.readdir)
class ProyectoController {
  async index({
    params
  }) {
    const {
      id
    } = params;
    const postulante = await Postulante.find(id)
    return await postulante.proyectos().fetch();
  }
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
    const postulante = await Postulante.find(id)
    const proyecto = new Proyecto();
    proyecto.fill({
      inscripcion_id,
      tipo,
      nombre_apellido,
      email,
      cuit
    });
    await postulante.proyectos().save(proyecto);
    return proyecto;
  }







  async get_files({
    response
  }) {
    const directoryPath = __basedir + "/archivos/licitacion";
    response.implicitEnd = false
    fs.readdir(directoryPath, function (err, files) {
      if (err) {
        response.status(500).send({
          message: "Unable to scan files!",
        });
      }

      let fileInfos = [];

      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: 'http://localhost:3333/api/v1/download/' + file,
        });
      });

      response.status(200).send(fileInfos);
    });
  };

  /* async get_filess({
    response
  }) {
    const directoryPath = __basedir + "/archivos/";
     fs.readdir(directoryPath, function (err, files) {
      if (err) {
        response.status(500).send({
          message: "Unable to scan files!",
        });
      }

      let fileInfos = [];

      files.forEach((file) => {
        fileInfos.push({
          name: file,
          url: 'http://localhost:3333/api/v1/upload' + file,
        });
      });
      console.log(fileInfos)
      response.status(500).send(fileInfos);
      
    });
    
  } */

  async down({
    response,
    params
  }) {
    const {
      name
    } = params;
    console.log(name)
    return await response.attachment(
      Helpers.appRoot('archivos/licitaciones/' + name)
    )
  }

  async create_t({
    auth,
    request
  }) {
    const user = await auth.getUser();

    const {
      nombre,
      id_proyecto,
      anio
    } = request.all();
    const proyecto = new Proyecto();
    proyecto.fill({
      nombre
    });
    await user.proyectos().save(proyecto);
    const licit = request.file('file', {
      types: ['zip'],
      size: '5mb'
    })
    await licit.move(Helpers.appRoot('archivos/licitaciones'), {
      name: id_proyecto + '-' + anio + `.zip`,
      overwrite: true
    })
    if (!licit.moved()) {
      return licit.error()
    }
    return proyecto;
  }

  async upload({
    auth,
    request
  }) {
    const user = await auth.getUser();
    const licit = request.file('file', {
      types: ['zip'],
      size: '5mb'
    })
    await licit.move(Helpers.appRoot('archivos'), {
      name: user.email + `.zip`,
      overwrite: true
    })
    if (!licit.moved()) {
      return licit.error()
    }
    return 'File moved'

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
  /* async create({
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
  } */
  async createeeee({
    request
  }) {

    const {
      nombre,
    } = request.all();
    const proyecto = new Proyecto();
    proyecto.fill({
      nombre
    });
    const licit = request.file('file', {
      types: ['zip'],
      size: '5mb'
    })
    await licit.move(Helpers.appRoot('archivos/licitaciones'), {
      name: id_proyecto + '-' + anio + `.zip`,
      overwrite: true
    })
    if (!licit.moved()) {
      return licit.error()
    }
    return proyecto;
  }
  /* class ProyectoController {
    async index({
      auth
    }) {
      const user = await auth.getUser();
      return await user.proyectos().fetch();
    } */

}

module.exports = ProyectoController
