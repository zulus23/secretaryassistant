package authentication.services
import authentication.daos.UserDAO
import authentication.model.{Enterprise, User}
import authentication.repository.UserRepository
import com.mohiva.play.silhouette.api.LoginInfo
import javax.inject.Inject

import scala.concurrent.{ExecutionContext, Future}

class UserServiceImpl @Inject()()(implicit ex: ExecutionContext)  extends UserService {
  override def save(user: User): Future[User] = ???


  override def retrieve(loginInfo: LoginInfo): Future[Option[User]] = {
      Future.successful(Option(userInfo(loginInfo.providerID)))
  }


  /*override def userInfo(username: String): Future[Option[User]] = {

  }*/
}
