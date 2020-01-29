package controllers

import javax.inject.{Inject, Singleton}
import models.SearchRequest
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, Action, AnyContent, ControllerComponents, Request}
import repository.SearchRepository

import scala.concurrent.{ExecutionContext, Future}


@Singleton
class SearchController @Inject()(cc: ControllerComponents,repository:SearchRepository)(implicit ex: ExecutionContext) extends AbstractController(cc) {
   import repository._
   import models.ImplicityFormat._

  def search = Action.async(parse.json[SearchRequest]) { implicit  request =>
    val searchRequest = SearchRequest(request.body.searchValue,request.body.typeRequest)
    val result = repository.searchCompanyByName("")
     result.map(s => Ok(Json.toJson(s)))
  }
}
