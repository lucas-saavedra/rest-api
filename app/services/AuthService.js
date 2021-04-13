const InvalidAcceException = use ('App/Exceptions/InvalidAcceException')
const ResNotFoundException = use ('App/Exceptions/ResNotFoundException')
class AuthService{
    VerifyPermission(resource,user){
        if (!resource){
            throw new ResNotFoundException();
        }
        //user_id es la relacion entre el proyecto y el usuario
        if (resource.user_id !== user.id){
          throw new InvalidAcceException();
          };
    }
}
module.exports = new AuthService();