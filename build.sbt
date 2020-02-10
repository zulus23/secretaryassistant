import play.sbt.routes.RoutesKeys

ThisBuild / name := "secretaryassistant"
ThisBuild / version := "1.0"
ThisBuild / scalaVersion := "2.13.1"

lazy val `secretaryassistant` = (project in file(".")).enablePlugins(PlayScala,LauncherJarPlugin).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"

resolvers += Resolver.jcenterRepo
resolvers += Resolver.mavenCentral



libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice,
  "com.microsoft.sqlserver" % "mssql-jdbc" % "7.4.1.jre11",
  "com.typesafe.play" %% "play-slick" % "5.0.0",
  "com.mohiva" %% "play-silhouette" % "6.1.0",
  "com.mohiva" %% "play-silhouette-password-bcrypt" % "6.1.0",
  "com.mohiva" %% "play-silhouette-crypto-jca" % "6.1.0",
  "com.mohiva" %% "play-silhouette-persistence" % "6.1.0",
  "com.mohiva" %% "play-silhouette-testkit" % "6.1.0" % "test",
  "net.codingwell" %% "scala-guice" % "4.2.6",
  "com.iheart" %% "ficus" % "1.4.7"

)

/*unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )*/

fork in Compile := true