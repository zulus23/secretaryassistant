package authentication.services

import authentication.model.{Enterprise, User}
import com.mohiva.play.silhouette.api.services.IdentityService

import scala.concurrent.Future

trait UserService extends IdentityService[User]{

  def save(user: User): Future[User]

  def enterprises(username:String):Future[Seq[Enterprise]]
  def userInfo(username:String):Future[Option[User]]
}
