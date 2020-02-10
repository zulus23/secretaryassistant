package controllers

import akka.http.scaladsl.model.HttpHeader.ParsingResult.Ok
import authentication.forms.SignInForm
import authentication.model.UserCredential
import authentication.services.UserService
import authentication.utils.JWTEnv
import com.mohiva.play.silhouette
import com.mohiva.play.silhouette.api.actions.{SecuredActionBuilder, SecuredRequest}
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.{EventBus, LoginEvent, LoginInfo, Silhouette}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.{AuthenticatorResult, AuthenticatorService}
import com.mohiva.play.silhouette.api.util.{Clock, Credentials, PasswordInfo}
import com.mohiva.play.silhouette.impl.authenticators.JWTAuthenticator
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import javax.inject.Inject
import play.api.Configuration
import play.api.i18n.{I18nSupport, Messages}
import play.api.libs.json.{Json, OFormat}
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request, Result}

import scala.concurrent.{ExecutionContext, Future}


class SignInController @Inject() (components: ControllerComponents,
                        silhouette: Silhouette[JWTEnv], userService: UserService,
                                  authInfoRepository: AuthInfoRepository,
                                  credentialsProvider: CredentialsProvider,configuration: Configuration,
                                  clock: Clock )(implicit

                                                 ex: ExecutionContext) extends AbstractController(components) with I18nSupport {

  implicit val emailCredentialFormat: OFormat[UserCredential] = Json.format[UserCredential]




  val SecuredAction: SecuredActionBuilder[JWTEnv, AnyContent] =
    silhouette.SecuredAction
  val authenticatorRepository: AuthenticatorService[JWTAuthenticator] =
    silhouette.env.authenticatorService
  val eventBus: EventBus = silhouette.env.eventBus


  def authenticate: Action[UserCredential] =
    Action.async(parse.json[UserCredential]) { implicit request =>
      val credentials = Credentials(request.body.username, request.body.password)
      credentialsProvider.authenticate(credentials).flatMap { loginInfo =>
        userService.retrieve(loginInfo).flatMap {
          case Some(user) => silhouette.env.authenticatorService.create(loginInfo).map {
            case authenticator => authenticator
          }.flatMap { authenticator =>
            silhouette.env.eventBus.publish(LoginEvent(user, request))
            silhouette.env.authenticatorService.init(authenticator).map { token =>
              Ok(token)
            }
          }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }.recover {
          case e: ProviderException =>
            Unauthorized(Json.obj("message" -> Messages("invalid.credentials")))
        }
      }.recover {
      case e: ProviderException =>
        Unauthorized(Json.obj("message" -> Messages("invalid.credentials.user")))
    }
    }




/*private def createAuthenticator(authenticator: JWTAuthenticator) = {
  authenticator.copy(expirationDateTime = rememberMeParams._1,
  idleTimeout = rememberMeParams._2
  )
}*/

  /*def view = silhouette.UnsecuredAction.async { implicit request: Request[AnyContent] =>
    Future.successful(Ok(views.html.signIn("Login",SignInForm.form)))
  }

  def submit  = silhouette.UnsecuredAction.async { implicit request: Request[AnyContent] =>
    SignInForm.form.bindFromRequest.fold(
      form => Future.successful(BadRequest(views.html.signIn("Error",form))),
      data => {
        val credentials = Credentials(data.userName, data.password)
        credentialsProvider.authenticate(credentials).flatMap { loginInfo =>
          userService.retrieve(loginInfo).flatMap {

            case Some(user) =>
              authInfoRepository.find[PasswordInfo](new LoginInfo(user.userName,user.userName)).flatMap {
               // case Some(totpInfo) => Future.successful(Ok(""))
                case _ => authenticateUser(user)
              }
            case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
          }
        }.recover {
          case _: ProviderException =>
            //Redirect(routes.SignInController.view()).flashing("error" -> Messages("invalid.credentials"))
        }
      }
    )
  }

  protected def authenticateUser(user: authentication.model.User)(implicit request: Request[_]): Future[AuthenticatorResult] = {
    val c = configuration.underlying
    val result = Redirect(routes.HomeController.index())
    silhouette.env.authenticatorService.create(new LoginInfo(user.userName,user.userName)).map {

      case authenticator => authenticator
    }.flatMap { authenticator =>
      silhouette.env.eventBus.publish(LoginEvent(user, request))
      silhouette.env.authenticatorService.init(authenticator).flatMap { v =>
        silhouette.env.authenticatorService.embed(v, result)
      }
    }
  }
*/
  def verifyToken =  SecuredAction.async {
    implicit request: SecuredRequest[JWTEnv,AnyContent] =>
      Future.successful(Ok(Json.toJson(request.authenticator.id)))
  }
}
