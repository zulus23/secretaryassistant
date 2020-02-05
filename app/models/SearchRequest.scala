package models

import models.SearchType.SearchType
import play.api.libs.json.{Format, JsError, JsResult, JsString, JsSuccess, JsValue, Json, Reads, Writes}

object EnumUtils {
  def enumReads[E <: Enumeration](enum: E): Reads[E#Value] =
    new Reads[E#Value] {
      def reads(json: JsValue): JsResult[E#Value] = json match {
        case JsString(s) => {
          try {
            JsSuccess(enum.withName(s))
          } catch {
            case _: NoSuchElementException =>
              JsError(s"Enumeration expected of type: '${enum.getClass},  but it does not appear to contain the value: '$s'")
          }
        }
        case _ => JsError("String value expected")
      }
    }

  implicit def enumWrites[E <: Enumeration]: Writes[E#Value] =
    new Writes[E#Value] {
      def writes(v: E#Value): JsValue = JsString(v.toString)
    }

  implicit def enumFormat[E <: Enumeration](enum: E): Format[E#Value] = {
    Format(enumReads(enum), enumWrites)
  }
}


object ImplicitFormat {

  implicit val formatSearchRequestJson = Json.format[SearchRequest]
  implicit val formatDetailRequestJson = Json.format[DetailCompanyRequest]
}

object SearchType extends Enumeration {
  type SearchType = Value
  val Company = Value("company")
  val Manager = Value("manager")
  val Phone = Value("phone")
  implicit val enumReads: Reads[SearchType] = EnumUtils.enumReads(SearchType)

  implicit def enumWrites: Writes[SearchType] = EnumUtils.enumWrites
}

case class SearchRequest(val searchValue: String,
                         val typeRequest: SearchType)

case class DetailCompanyRequest(val codeCompany: String)