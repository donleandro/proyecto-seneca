name := "Player"

version := "1.0"

lazy val `player` = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq( jdbc , cache , ws , specs2 % Test, cache )

pipelineStages := Seq(rjs, digest, gzip)

RjsKeys.mainModule := "require-config"

unmanagedResourceDirectories in Test <+=  baseDirectory ( _ /"target/web/public/test" )  

resolvers += "scalaz-bintray" at "https://dl.bintray.com/scalaz/releases"  
