'use strict'

const Helpers = use('Helpers')
const fs = require("fs");

class PhotoController {
  async upload( {request} ) {
    const licit = request.file('file', {
      types: ['zip','x-zip-compressed','rar'],
      size: '15mb'
    })
    await licit.move(Helpers.appRoot('archivos/licitaciones'), {
      name: `test.zip`,
      overwrite: true
    })
    if (!licit.moved()) {
      return licit.error()
    }
    return 'file'
  }


 

}
module.exports = PhotoController
