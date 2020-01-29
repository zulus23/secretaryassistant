name := "secretaryassistant"
 
version := "1.0" 
      
lazy val `secretaryassistant` = (project in file(".")).enablePlugins(PlayScala).settings(
  watchSources ++= (baseDirectory.value / "public/ui" ** "*").get
)

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"
      
resolvers += "Akka Snapshot Repository" at "https://repo.akka.io/snapshots/"
      
scalaVersion := "2.13.1"

libraryDependencies ++= Seq( jdbc , ehcache , ws , specs2 % Test , guice,
  "com.microsoft.sqlserver" % "mssql-jdbc" % "7.4.1.jre11",
  "com.typesafe.play" %% "play-slick" % "5.0.0",
)

/*unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )*/

fork in Compile := true