package controllers

import authentication.utils.JWTEnv
import com.mohiva.play.silhouette
import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.{SecuredActionBuilder, SecuredRequest}
import javax.inject.{Inject, Singleton}
import models.{DetailCompanyRequest, SearchRequest}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}
import repository.SearchRepository

import scala.concurrent.{ExecutionContext, Future}


@Singleton
class SearchController @Inject()(cc: ControllerComponents,repository:SearchRepository, silhouette: Silhouette[JWTEnv])(implicit ex: ExecutionContext) extends AbstractController(cc) {
   import repository._
   import models.ImplicitFormat._
  val SecuredAction: SecuredActionBuilder[JWTEnv, AnyContent] =
    silhouette.SecuredAction





  def search = SecuredAction.async(parse.json[SearchRequest]) { implicit  request:SecuredRequest[JWTEnv,SearchRequest] =>
    val searchRequest = SearchRequest(request.body.searchValue,request.body.typeRequest)
    val result = repository.searchCompanyByName(searchRequest.searchValue)
     result.map(s => Ok(Json.toJson(s)))
  }
  def loadManager = SecuredAction.async(parse.json[DetailCompanyRequest]){ implicit request:SecuredRequest[JWTEnv,DetailCompanyRequest] =>

    val detailCompanyRequest  = DetailCompanyRequest(request.body.codeCompany)
    val result = repository.loadManagerByCompany(detailCompanyRequest.codeCompany)
    result.map(s => Ok(Json.toJson(s)))

  }
  def loadTechnicalSupport = SecuredAction.async(parse.json[DetailCompanyRequest]){ implicit request:SecuredRequest[JWTEnv,DetailCompanyRequest] =>

    val detailCompanyRequest  = DetailCompanyRequest(request.body.codeCompany)
    val result = repository.loadTechnicalSupportByCompany(detailCompanyRequest.codeCompany)
    result.map(s => Ok(Json.toJson(s)))

  }

}
