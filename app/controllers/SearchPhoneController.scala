package controllers

import authentication.utils.JWTEnv
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.{SecuredActionBuilder, SecuredRequest}
import javax.inject.{Inject, Singleton}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, AnyContent, ControllerComponents}
import models.{DetailCompanyRequest, SearchRequest}
import repository.SearchPhoneRepository

import scala.concurrent.ExecutionContext

@Singleton
class SearchPhoneController @Inject()(cc: ControllerComponents,repository:SearchPhoneRepository, silhouette: Silhouette[JWTEnv])
                                     (implicit ex: ExecutionContext) extends AbstractController(cc) {
  import repository._
  import models.ImplicitFormat._

  val SecuredAction: SecuredActionBuilder[JWTEnv, AnyContent] =
    silhouette.SecuredAction


  def searchPhone = SecuredAction.async(parse.json[SearchRequest]) { implicit  request:SecuredRequest[JWTEnv,SearchRequest] =>
    val searchRequest = SearchRequest(request.body.searchValue,request.body.typeRequest)
    val result = repository.searchPhoneOrEmployee(searchRequest.searchValue)
    result.map(s => Ok(Json.toJson(s)))
  }

}
