package services

import java.util.Calendar

import com.google.inject.Singleton
import models.{StreamInfo, APProgram, Song, APSong}
import models.formatter.WebPack._
import play.api.libs.json.JsValue
import play.api.libs.ws.WS
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future
import play.api.mvc._

/**
  * Created by davidmesa on 2/6/16.
  */
@Singleton
class StreamingInfoService {

  val AirTimeUrl = "http://www.intervals.xyz/api/live-info"
  val LastFMUrl = "http://ws.audioscrobbler.com/2.0/?api_key=bbed8d87ebb5735fba13521f4d07ba8c&method=track.getInfo&track="
  val dateFormat = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

  def requestParameter(header: RequestHeader): String ={
    "AirplayKey"
  }

  def getInfoFromAirPlay: Future[StreamInfo] ={

    WS.url(AirTimeUrl).get().map{
      APResponse =>
        val jResponse = APResponse.json
        val currentShow = (jResponse \ "currentShow").as[List[JsValue]].headOption.map(_.as[APProgram]).orElse(None)
        val currentShowCorrected = currentShow.map(atProgram =>
            APProgram(correctTime(atProgram.starts), correctTime(atProgram.ends),
              atProgram.name, atProgram.url))
        if( (jResponse \ "current" \ "name").as[String] != ""
          && (jResponse \ "current" \ "type").as[String] == "track"){
          val currentSong = (jResponse \ "current").as[APSong]
          val songNameInfo = currentSong.name.split("-").map(_.trim)
          val endTime = currentSong.ends
          WS.url(LastFMUrl+songNameInfo(1)+"&artist="+songNameInfo(0)).get()
            .map{
              LFMResponse =>
                val imgURL = (scala.xml.XML.loadString(LFMResponse.body) \ "track" \\ "image")
                  .lastOption.map(_.text).orNull
                StreamInfo(currentShowCorrected, Some(Song(songNameInfo(1), songNameInfo(0), imgURL, endTime)))
            }
        }
        else{
          Future(StreamInfo(currentShowCorrected, None))
        }
    }.flatMap(x=>x)
  }

  def correctTime(dateStr: String): String ={
    val date = dateFormat.parse(dateStr)
    val calendar = Calendar.getInstance()
    calendar.setTime(date)
    calendar.add(Calendar.HOUR_OF_DAY, 5)
    dateFormat.format(calendar.getTime())
  }

}
