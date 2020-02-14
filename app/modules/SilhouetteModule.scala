package modules



import authentication.models.daos.{UserDAO, UserDAOImpl}
import authentication.utils.{CustomSecuredErrorHandler, CustomUnsecuredErrorHandler}
import com.google.inject.{AbstractModule, Provides}
import com.mohiva.play.silhouette.api.actions.{SecuredErrorHandler, UnsecuredErrorHandler}
import com.mohiva.play.silhouette.api.crypto.{Crypter, CrypterAuthenticatorEncoder}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services.AuthenticatorService
import com.mohiva.play.silhouette.api.util.{Clock, FingerprintGenerator, HTTPLayer, IDGenerator, PasswordHasherRegistry, PasswordInfo, PlayHTTPLayer}
import com.mohiva.play.silhouette.api.{Environment, EventBus, LoginInfo, Silhouette, SilhouetteProvider}
import com.mohiva.play.silhouette.crypto.{JcaCrypter, JcaCrypterSettings}
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import com.mohiva.play.silhouette.impl.util.{DefaultFingerprintGenerator, SecureRandomIDGenerator}
import com.mohiva.play.silhouette.persistence.daos.{DelegableAuthInfoDAO, InMemoryAuthInfoDAO}
import com.mohiva.play.silhouette.persistence.repositories.DelegableAuthInfoRepository
import javax.inject.Named
import net.ceedubs.ficus.Ficus._
import net.ceedubs.ficus.readers.ArbitraryTypeReader._
import net.ceedubs.ficus.readers.EnumerationReader._

// import net.ceedubs.ficus.readers.EnumerationReader._ это импорт нужен но его удаляет оптимизатор
import net.codingwell.scalaguice.ScalaModule
import play.api.Configuration
import play.api.libs.concurrent.AkkaGuiceSupport
import play.api.mvc.SessionCookieBaker

import scala.concurrent.ExecutionContext.Implicits.global


import authentication.services.{UserService, UserServiceImpl}
import authentication.utils.{DummyPasswordHasher, JWTEnv}
import play.api.libs.ws.WSClient



class SilhouetteModule extends AbstractModule with ScalaModule with AkkaGuiceSupport {
  override def configure(): Unit = {

    bind[Silhouette[JWTEnv]].to[SilhouetteProvider[JWTEnv]]
    bind[UnsecuredErrorHandler].to[CustomUnsecuredErrorHandler]
    bind[SecuredErrorHandler].to[CustomSecuredErrorHandler]

    bind[UserService].to[UserServiceImpl]
    bind[UserDAO].to[UserDAOImpl]
    bind[DelegableAuthInfoDAO[PasswordInfo]].toInstance(new InMemoryAuthInfoDAO[PasswordInfo])

    bind[IDGenerator].toInstance(new SecureRandomIDGenerator())
    bind[FingerprintGenerator].toInstance(new DefaultFingerprintGenerator(false))

    bind[PasswordHasherRegistry].toInstance(PasswordHasherRegistry(
      current = new DummyPasswordHasher(),
      deprecated = Seq()
    ))
    bind[EventBus].toInstance(EventBus())
    bind[Clock].toInstance(Clock())
  }

  @Provides
  def provideHTTPLayer(client: WSClient): HTTPLayer = new PlayHTTPLayer(client)

  @Provides
  def provideJWTEnvironment(
                          userService: UserService,
                          authenticatorService: AuthenticatorService[JWTAuthenticator],
                          eventBus: EventBus): Environment[JWTEnv] = {

    Environment[JWTEnv](
      userService,
      authenticatorService,
      Seq(),
      eventBus
    )
  }



  /** Crypter for the authenticator.
  */
  @Provides @Named("authenticator-crypter")
  def provideAuthenticatorCrypter(configuration: Configuration): Crypter = {

    val config = configuration.underlying.as[JcaCrypterSettings]("silhouette.jwt.authenticator.crypter")
    new JcaCrypter(config)
  }

  /*@Provides
  def provideSessionAuthenticatorService(
                                      @Named("authenticator-crypter") crypter: Crypter,
                                      fingerprintGenerator: FingerprintGenerator,
                                      idGenerator: IDGenerator,
                                      configuration: Configuration,
                                      sessionCookieBaker: SessionCookieBaker,
                                      clock: Clock): AuthenticatorService[SessionAuthenticator] = {

    val config = configuration.underlying.as[SessionAuthenticatorSettings]("silhouette.session.authenticator")
    val encoder = new CrypterAuthenticatorEncoder(crypter)


    new SessionAuthenticatorService(config, fingerprintGenerator, encoder, sessionCookieBaker, clock)
  }
*/

  @Provides
  def provideJwtAuthenticatorService(
                                      @Named("authenticator-crypter") crypter: Crypter,
                                      idGenerator: IDGenerator,
                                      configuration: Configuration,
                                      clock: Clock): AuthenticatorService[JWTAuthenticator] = {

    val config = configuration.underlying.as[JWTAuthenticatorSettings]("silhouette.jwt.authenticator")
    val encoder = new CrypterAuthenticatorEncoder(crypter)
    new JWTAuthenticatorService(config, None, encoder, idGenerator, clock)
  }
  /*@Provides
  def provideAuthInfoRepository(passwordInfoDAO: DelegableAuthInfoDAO[PasswordInfo]): AuthInfoRepository = {

    new DelegableAuthInfoRepository(passwordInfoDAO)
  }*/
  @Provides
  def provideAuthInfoRepository(passwordInfoDAO: DelegableAuthInfoDAO[PasswordInfo]): AuthInfoRepository = {

    passwordInfoDAO.add(LoginInfo("credentials","1"),PasswordInfo("dummy-hasher","1"))
    new DelegableAuthInfoRepository(passwordInfoDAO)
  }

  /*@Provides
  def providePasswordInfoRepository(userRepository: UserRepository):DelegableAuthInfoDAO[PasswordInfo] = {
     new PasswordInfoDaoMssql(userRepository)
  }
*/

  @Provides
  def provideCredentialsProvider(
                                  authInfoRepository: AuthInfoRepository,
                                  passwordHasherRegistry: PasswordHasherRegistry): CredentialsProvider = {

    new CredentialsProvider(authInfoRepository, passwordHasherRegistry)
  }
}
