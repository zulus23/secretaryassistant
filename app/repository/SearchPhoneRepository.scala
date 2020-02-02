package repository

import javax.inject.{Inject, Singleton}
import models.Phone
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.jdbc.{GetResult, JdbcProfile}
import slick.jdbc.SQLServerProfile.api._

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SearchPhoneRepository @Inject()(@play.db.NamedDatabase(value = "phonedb") _dbConfigProvider:DatabaseConfigProvider)
                                    (implicit ex :ExecutionContext)  extends HasDatabaseConfigProvider[JdbcProfile]{
  override protected val dbConfigProvider: DatabaseConfigProvider = _dbConfigProvider
  implicit  val getResult = GetResult(r => Phone(r.nextString,r.nextString,r.nextString,r.nextString,r.nextString,r.nextString,r.nextString,r.nextString,r.nextString,r.nextString))
  implicit  val companyToJson = Json.writes[Phone]

  def searchPhoneOrEmployee(): Future[Seq[Phone]] = {
    db.run({
         sql""" """.as[Phone]
    })
  }

}
