package controllers

import javax.inject.{Inject, Singleton}
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}
import models.{DetailCompanyRequest, SearchRequest}
import repository.SearchPhoneRepository

import scala.concurrent.ExecutionContext

@Singleton
class SearchPhoneController @Inject()(cc: ControllerComponents,repository:SearchPhoneRepository)
                                     (implicit ex: ExecutionContext) extends AbstractController(cc) {
  import repository._
  import models.ImplicitFormat._

  def searchPhone = Action.async(parse.json[SearchRequest]) { implicit  request =>
    val searchRequest = SearchRequest(request.body.searchValue,request.body.typeRequest)
    val result = repository.searchPhoneOrEmployee(searchRequest.searchValue)
    result.map(s => Ok(Json.toJson(s)))
  }

}
