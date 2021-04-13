'use strict'

class LicitController {
  async index({
    auth
  }) {
    const user = await auth.getUser();
    console.log(user);
    return {
      mensaje: "Hola mundo index"
    }
  }
}
module.exports = LicitController
