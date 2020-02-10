package authentication.utils

import com.mohiva.play.silhouette.api.util.{PasswordHasher, PasswordInfo}

class DummyPasswordHasher extends PasswordHasher {
  override def id: String = "dummy-hasher"

  override def hash(plainPassword: String): PasswordInfo = PasswordInfo(id, plainPassword)

  override def matches(passwordInfo: PasswordInfo, suppliedPassword: String): Boolean = passwordInfo.password == suppliedPassword

  override def isDeprecated(passwordInfo: PasswordInfo): Option[Boolean] = None
}
