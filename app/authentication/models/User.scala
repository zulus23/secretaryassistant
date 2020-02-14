package authentication.models

import java.util.UUID

import com.mohiva.play.silhouette.api.{Identity, LoginInfo}
import play.api.libs.json.Json

case class User(userID: UUID,
                loginInfo: LoginInfo) extends Identity

object User {

  implicit val userToJson = Json.writes[User]

}
case class UserPassword(userId: Int,userName: String,password:String)
