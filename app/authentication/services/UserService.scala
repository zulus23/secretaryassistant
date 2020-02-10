package authentication.services

import authentication.model.User
import com.mohiva.play.silhouette.api.services.IdentityService

import scala.concurrent.Future

trait UserService extends IdentityService[User]{

  def save(user: User): Future[User]


}
