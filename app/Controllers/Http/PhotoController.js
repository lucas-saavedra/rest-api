'use strict'

const Helpers = use('Helpers')

class PhotoController {
  async upload( {request, response} ) {
    const photo = request.file('file')
    await photo.move(Helpers.tmpPath('photos'), {
      name: new Date().getTime(),
      overwrite: true
    })
  }
}

module.exports = PhotoController
