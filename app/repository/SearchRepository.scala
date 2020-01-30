package repository

import javax.inject.{Inject, Singleton}
import models.{Company, ManagerCompany}
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import slick.jdbc.SQLServerProfile.api._
import slick.jdbc.{GetResult, JdbcProfile}

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class SearchRepository @Inject()(@play.db.NamedDatabase(value = "searchdb") _dbConfigProvider:DatabaseConfigProvider)
                                (implicit ex :ExecutionContext)  extends HasDatabaseConfigProvider[JdbcProfile]{
  override protected val dbConfigProvider: DatabaseConfigProvider = _dbConfigProvider
  implicit  val getResult = GetResult(r => Company(r.nextString,r.nextString,r.nextInt,r.nextString))
  implicit  val companyToJson = Json.writes[Company]

  implicit  val getResultManager = GetResult(r => ManagerCompany(r.nextString,r.nextString,r.nextString,r.nextString))
  implicit  val managerToJson = Json.writes[ManagerCompany]


  def searchCompanyByName(searchValue:String): Future[Seq[Company]] = db.run({
      val result =
        sql""" select rootC.nameRootCompany as rootCompany,g.cust_num as code, g.cust_seq as seq, g.name as name from sl_gotek.dbo.custaddr g
                OUTER APPLY  (SELECT a.name AS nameRootCompany FROM SL_gotek.dbo.custaddr a WHERE a.cust_num = g.cust_num AND a.cust_seq = 0) AS rootC
             where g.cust_num not in ('K005404','K000827','K000828','K001813','K000029') and  g.name like '%#$searchValue%'
             order by g.cust_num """.as[Company]
      result
  })

  def loadDetailByCompany(codeCompany: String): Future[Seq[ManagerCompany]] = {

    db.run({
      val result = sql""" WITH manager(enterprise,type_,name,phone) AS
                        |(
                        |
                        |SELECT 'ГОТЭК', 'Бек',e1.name, e1.phone FROM sl_gotek.dbo.customer c
                        |JOIN sl_gotek..slsman s1  ON c.slsman = s1.slsman
                        |JOIN sl_gotek..employee e1  ON s1.ref_num = e1.emp_num
                        |WHERE c.cust_num = '#$codeCompany' AND c.cust_seq = 0
                        |UNION ALL
                        |SELECT 'ГОТЭК','Фронт',e1.name, e1.phone FROM sl_gotek.dbo.customer c
                        |JOIN   sl_gotek..slsman s1  ON c.uf_slsmanfront = s1.slsman
                        |JOIN sl_gotek..employee e1  ON s1.ref_num = e1.emp_num
                        |WHERE c.cust_num = '#$codeCompany' AND c.cust_seq = 0
                        |UNION ALL
                        |SELECT 'ГОТЭК','Кам',e1.name, e1.phone FROM sl_gotek.dbo.customer c
                        |JOIN   sl_gotek..slsman s1  ON c.uf_strategmanager = s1.slsman
                        |JOIN sl_gotek..employee e1  ON s1.ref_num = e1.emp_num
                        |WHERE c.cust_num = '#$codeCompany' AND c.cust_seq = 0
                        |)
                        |SELECT * FROM manager
                        |  """.stripMargin.as[ManagerCompany]
      result
    })
  }

}
