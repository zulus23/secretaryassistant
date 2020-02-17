package repository

import javax.inject.{Inject, Singleton}
import models.{Company, ManagerCompany, Support}
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

  implicit  val getResultManager = GetResult(r => ManagerCompany(r.nextString,r.nextString,r.nextString,r.nextString,r.nextString,r.nextString))
  implicit  val managerToJson = Json.writes[ManagerCompany]

  implicit  val getResultSupport = GetResult(r => Support(r.nextString,r.nextString,r.nextString,r.nextString,r.nextString))
  implicit  val supportToJson = Json.writes[Support]




  def searchCompanyByName(searchValue:String): Future[Seq[Company]] = db.run({
      val result =
        sql""" select rootC.nameRootCompany as rootCompany,g.cust_num as code, g.cust_seq as seq, g.name as name from sl_gotek.dbo.custaddr g
                OUTER APPLY  (SELECT a.name AS nameRootCompany FROM SL_gotek.dbo.custaddr a WHERE a.cust_num = g.cust_num AND a.cust_seq = 0) AS rootC
             where g.cust_num not in ('K005404','K000827','K000828','K001813','K000029','K000358', 'K005078','K001800') and isnull(g.uf_prochrealiz,0) = 0
             and exists(select 1 from sl_gotek.dbo.gtk_cust_old o where g.cust_num = o.cust_num)
             and  g.name like '%#$searchValue%'
             order by g.cust_num """.as[Company]
      result
  })

  def loadManagerByCompany(codeCompany: String): Future[Seq[ManagerCompany]] = {

    for (
      gotek <- loadManager("ГОТЭК","sl_gotek",codeCompany);
      center <- loadManager("ГОТЭК-Центр","sl_center",codeCompany);
      north <- loadManager("ГОТЭК-Север","sl_spb",codeCompany);
      print <- loadManager("ГОТЭК-Принт","sl_print",codeCompany);
      litar <- loadManager("ГОТЭК-Литар","sl_litar",codeCompany);
      polypack <- loadManager("ГОТЭК-Полипак","sl_polypack",codeCompany)
    ) yield  gotek ++ center ++ north ++ print ++ litar ++ polypack
  }

  val loadManager = (enterprise: String,dbName:String, codeCompany:String) => {
    db.run({
      val result = sql""" WITH manager(enterprise,department,mobphone,type_,name,phone) AS
                        |(
                        |
                        |SELECT '#$enterprise',e1.dept as department,e1.uf_mobphone as mobphone, 'Бэк',e1.name, e1.phone FROM #$dbName.dbo.customer c
                        |JOIN #$dbName..slsman s1  ON c.slsman = s1.slsman
                        |JOIN #$dbName..employee e1  ON s1.ref_num = e1.emp_num
                        |WHERE c.cust_num = '#$codeCompany' AND c.cust_seq = 0
                        |UNION ALL
                        |SELECT '#$enterprise',e1.dept as department,e1.uf_mobphone as mobphone,'Фронт',e1.name, e1.phone FROM #$dbName.dbo.customer c
                        |JOIN   #$dbName..slsman s1  ON c.uf_slsmanfront = s1.slsman
                        |JOIN #$dbName..employee e1  ON s1.ref_num = e1.emp_num
                        |WHERE c.cust_num = '#$codeCompany' AND c.cust_seq = 0
                        |UNION ALL
                        |SELECT '#$enterprise',e1.dept as department,e1.uf_mobphone as mobphone,'Кам',e1.name, e1.phone FROM #$dbName.dbo.customer c
                        |JOIN   #$dbName..slsman s1  ON c.uf_strategmanager = s1.slsman
                        |JOIN #$dbName..employee e1  ON s1.ref_num = e1.emp_num
                        |WHERE c.cust_num = '#$codeCompany' AND c.cust_seq = 0
                        |)
                        |SELECT * FROM manager
                        |  """.stripMargin.as[ManagerCompany]
      result
    })
  }


  def loadTechnicalSupportByCompany(codeCompany: String): Future[Seq[Support]] = {

    for (
        gotek <- support("ГОТЭК","sl_gotek",codeCompany);
        center <- support("ГОТЭК-Центр","sl_center",codeCompany);
        north <- support("ГОТЭК-Север","sl_spb",codeCompany);
        print <- support("ГОТЭК-Принт","sl_print",codeCompany);
        litar <- support("ГОТЭК-Литар","sl_litar",codeCompany);
        polypack <- support("ГОТЭК-Полипак","sl_polypack",codeCompany)
     ) yield  gotek ++ center ++ north ++ print ++ litar ++ polypack
  }
  val support = (enterprise: String,dbName:String, codeCompany:String) => {
    db.run({sql"""select '#$enterprise', case ishdr
         |       when 0 then 'Специалист'
         |       when 1 then 'Руководитель'
         |       when 2 then 'Конструктор'
         |       when 3 then 'Логист'
         |       when 4 then 'Проектировщик'
         |       when 5 then 'Технолог'
         |       end as typeSupport
         |       ,e.name
         |       ,e.phone
         |       ,e.uf_mobphone as mobphone
         |from #$dbName..custaddr g
         |INNER JOIN #$dbName..customer c  ON g.cust_num = c.cust_num and c.cust_seq = g.cust_seq and c.cust_seq = 0
         |left outer join #$dbName..gtk_cust_sup s on (s.cust_num = c.cust_num )
         |left outer join #$dbName..employee e on (s.emp_num = e.emp_num)
         |where  g.cust_num = c.cust_num and c.cust_seq = 0  and isaktive = 1 and c.cust_num = '#$codeCompany'
         |order by g.name
         | """.stripMargin.as[Support]})
  }

}
