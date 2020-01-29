package repository

import javax.inject.{Inject, Singleton}
import models.Company
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.jdbc.SQLServerProfile.api._
import slick.jdbc.{GetResult, JdbcProfile}

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SearchRepository @Inject()(@play.db.NamedDatabase(value = "searchdb") _dbConfigProvider:DatabaseConfigProvider)
                                (implicit ex :ExecutionContext)  extends HasDatabaseConfigProvider[JdbcProfile]{
  override protected val dbConfigProvider: DatabaseConfigProvider = _dbConfigProvider
  implicit  val getResult = GetResult(r => Company(r.nextString,r.nextString))
  implicit  val companyToJson = Json.writes[Company]

  def searchCompanyByName(searchValue:String): Future[Seq[Company]] = db.run({
      val result = sql""" select cust_num as code, name as name from sl_litar.dbo.custaddr where cust_num= 'K000650' """.as[Company]
      result
  })

}
