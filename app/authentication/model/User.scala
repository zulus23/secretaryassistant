package authentication.model

import com.mohiva.play.silhouette.api.Identity
import play.api.libs.json.Json

case class User(userId: Int, userName: String) extends Identity

object User {

  implicit val userToJson = Json.writes[User]

}
case class UserPassword(userId: Int,userName: String,password:String)
