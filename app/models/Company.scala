package models

case class Company(rootCompany:String,code:String,seq: Int,name:String)
case class ManagerCompany(enterprise: String,department: String,mobphone: String,typeManager: String, name: String,phone: String)
case class Support(enterprise: String,typeSupport: String, nameEmployee: String, phone: String,mobphone: String)

