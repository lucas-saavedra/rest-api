'use strict'
const Proyecto = use('App/Models/Proyecto')
const AuthService = use('App/services/AuthService')
const Helpers = use('Helpers')
const fs = require("fs");

const readdir = Helpers.promisify(fs.readdir)
class ProyectoController {
  async index({
    auth
  }) {
    const user = await auth.getUser();
    return await user.proyectos().fetch();
  }

  async get_files ({response}) {
    const directoryPath = __basedir + "/archivos/licit";
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
          url: 'http://127.0.0.1:3333/'+ file,
        });
      });
  
      response.status(200).send(fileInfos);
    });
  };
 
  async get_filess({
    response
  }) {
    const directoryPath = __basedir + "/archivos/licit/";
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
          url: 'http://127.0.0.1:3333/api/v1/upload' + file,
        });
      });
      console.log(fileInfos)
      response.status(500).send(fileInfos);
      
    });
    
  }

  async down({
    response,params
  }) {
    const {
      name
    } = params;
    console.log(name)
    return await response.attachment(
      Helpers.appRoot('archivos/licit/'+ name)
      
      )
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
    response
  }) {
    const user = await auth.getUser();
    const profilePic = request.file('file', {
      types: ['zip'],
      size: '2mb'
    })
    await profilePic.move(Helpers.appRoot('archivos/licit'), {
      name: user.email + `.zip`,
      overwrite: true
    })
    if (!profilePic.moved()) {
      return profilePic.error()
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

}

module.exports = ProyectoController
