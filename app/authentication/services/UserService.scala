package authentication.services

import java.util.UUID

import authentication.models.User
import com.mohiva.play.silhouette.api.services.IdentityService

import scala.concurrent.Future

trait UserService extends IdentityService[User]{
  def retrieve(id: UUID): Future[Option[User]]
  def save(user: User): Future[User]


}
