package controllers

import javax.inject.{Inject, Singleton}
import play.api.mvc.{AbstractController, ControllerComponents}
import repository.SearchPhoneRepository

import scala.concurrent.ExecutionContext

@Singleton
class SearchPhoneController @Inject()(cc: ControllerComponents,repository:SearchPhoneRepository)
                                     (implicit ex: ExecutionContext) extends AbstractController(cc) {


}
