'use strict'
 
const User = use('App/Models/User');
const Helpers = use('Helpers')
const fs = require("fs");
 
class UserController {
  async login({ request, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    return token;
  }
 
  async store({ request }) {
    const { email, password } = request.all();
    const user = await User.create({
      email,
      password,
      username: email
    });
    /* ll */
    const licit = request.file('file', {
      types: ['zip','x-zip-compressed','rar'],
      size: '15mb'
    })
    await licit.move(Helpers.appRoot('archivos/licitaciones'), {
      name: email+`.zip`,
      overwrite: true
    })
    if (!licit.moved()) {
      return licit.error()
    }
    /* ll */
    return this.login(...arguments);
  };
 
  async index({ request }) {
    return await User.all()
  }

 

}
 
module.exports = UserController