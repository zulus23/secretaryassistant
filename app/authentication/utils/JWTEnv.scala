package authentication.utils

import authentication.models.User
import com.mohiva.play.silhouette.api.Env
import com.mohiva.play.silhouette.impl.authenticators.JWTAuthenticator

trait JWTEnv extends Env {
  type I = User
  type A = JWTAuthenticator
}
