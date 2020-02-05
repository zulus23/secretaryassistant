package controllers

import javax.inject.{Inject, Singleton}
import models.{DetailCompanyRequest, SearchRequest}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}
import repository.SearchRepository

import scala.concurrent.{ExecutionContext, Future}


@Singleton
class SearchController @Inject()(cc: ControllerComponents,repository:SearchRepository)(implicit ex: ExecutionContext) extends AbstractController(cc) {
   import repository._
   import models.ImplicitFormat._

  def search = Action.async(parse.json[SearchRequest]) { implicit  request =>
    val searchRequest = SearchRequest(request.body.searchValue,request.body.typeRequest)
    val result = repository.searchCompanyByName(searchRequest.searchValue)
     result.map(s => Ok(Json.toJson(s)))
  }
  def loadManager = Action.async(parse.json[DetailCompanyRequest]){ implicit request =>

    val detailCompanyRequest  = DetailCompanyRequest(request.body.codeCompany)
    val result = repository.loadManagerByCompany(detailCompanyRequest.codeCompany)
    result.map(s => Ok(Json.toJson(s)))

  }
  def loadTechnicalSupport = Action.async(parse.json[DetailCompanyRequest]){ implicit request =>

    val detailCompanyRequest  = DetailCompanyRequest(request.body.codeCompany)
    val result = repository.loadTechnicalSupportByCompany(detailCompanyRequest.codeCompany)
    result.map(s => Ok(Json.toJson(s)))

  }

}
