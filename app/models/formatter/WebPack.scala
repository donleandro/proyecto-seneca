package models.formatter

import models._
import play.api.libs.json.Json

/**
  * Created by davidmesa on 2/6/16.
  */
object WebPack {

  implicit val aPSongFormat = Json.format[APSong]
  implicit val songFormat = Json.format[Song]
  implicit val aPProgramFormat = Json.format[APProgram]
  implicit val streamInfoFormat = Json.format[StreamInfo]
  implicit val programFormat = Json.format[Program]
  implicit val episodeFormat = Json.format[Episode]
  implicit val programExtendedFormat = Json.format[ProgramExtended]

}
