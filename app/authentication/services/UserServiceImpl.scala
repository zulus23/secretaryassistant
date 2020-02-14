package authentication.services
import java.util.UUID

import authentication.models.User
import authentication.models.daos.UserDAO
import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

class UserServiceImpl @Inject()(userDAO: UserDAO)(implicit ex: ExecutionContext)  extends UserService {
  override def save(user: User): Future[User] = ???


  def retrieve(id: UUID) = userDAO.find(id)

  /**
   * Retrieves a user that matches the specified login info.
   *
   * @param loginInfo The login info to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given login info.
   */
  def retrieve(loginInfo: LoginInfo): Future[Option[User]] = userDAO.find(loginInfo)


  /*override def userInfo(username: String): Future[Option[User]] = {

  }*/
}
