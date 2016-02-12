package services

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
class StreamingInfo {

  val AirTimeUrl = "http://www.intervals.xyz/api/live-info"
  val LastFMUrl = "http://ws.audioscrobbler.com/2.0/?api_key=bbed8d87ebb5735fba13521f4d07ba8c&method=track.getInfo&track="

  def requestParameter(header: RequestHeader): String ={
    "AirplayKey"
  }

  def getInfoFromAirPlay: Future[StreamInfo] ={

    WS.url(AirTimeUrl).get().map{
      APResponse =>
        val jResponse = APResponse.json
        val currentShow = (jResponse \ "currentShow").as[List[JsValue]].headOption.map(_.as[APProgram]).orElse(None)
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
                println(imgURL)
                StreamInfo(currentShow, Some(Song(songNameInfo(1), songNameInfo(0), imgURL, endTime)))
            }
        }
        else{
          Future(StreamInfo(currentShow, None))
        }
    }.flatMap(x=>x)
  }

}
