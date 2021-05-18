'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */

'use strict'

const Route = use('Route')
const Helpers = use('Helpers')
Route.group(() => {

  Route.post('users/', 'UserController.store');
  Route.post('users/login', 'UserController.login');
  Route.get('users/', 'UserController.index');
  //Rutas de los Proyectos
  Route.get('proyectos', 'ProyectoController.index').middleware('auth');
  Route.get('proyectos', 'ProyectoController.index').middleware('auth');
  Route.post('proyectos', 'ProyectoController.create').middleware('auth');
  Route.patch('proyectos/:id', 'ProyectoController.update').middleware('auth');
  Route.delete('proyectos/:id', 'ProyectoController.destroy').middleware('auth');
  //Rutas de las tareas

  Route.post('proyectos/:id/tareas', 'TareaController.create').middleware('auth');
  Route.get('proyectos/:id/tareas', 'TareaController.index').middleware('auth');
  Route.patch('tareas/:id', 'TareaController.update').middleware('auth');
  Route.delete('tareas/:id', 'TareaController.destroy').middleware('auth');

  // Get icitaciones
  //Route.get('licitaciones/', 'LicitacionController.index').middleware('guest');
  Route.post('licitaciones/', 'LicitacionController.create').middleware('guest');
  Route.get('licitaciones/:estado', 'LicitacionController.estado').middleware('guest');
  Route.get('licitaciones/id/:id', 'LicitacionController.show').middleware('guest');
  //Get concursos
  Route.get('concursos/', 'ConcursoController.index').middleware('guest');
  Route.get('concursos/:estado', 'ConcursoController.estado').middleware('guest');
  Route.get('concursos/id/:id', 'ConcursoController.show').middleware('guest');
  Route.get('concursos/adj/:id', 'ConcursoController.get_adj_imp').middleware('guest');






  Route.post('upload', 'PhotoController.upload').middleware('guest');

  Route.get('download/:name', 'ProyectoController.down').middleware('guest');
  Route.get('upload', 'ProyectoController.get_files').middleware('guest');

  //Postulante
  Route.post('postulante', 'PostulanteController.create').middleware('guest');
  Route.get('postulantes/:tipo', 'PostulanteController.tipo').middleware('guest');


}).prefix('api/v1/');
