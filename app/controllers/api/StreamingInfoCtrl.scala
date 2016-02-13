/**
  * Created by davidmesa on 2/6/16.
  */
package controllers.api

import play.api.libs.json.Json
import play.api.mvc.{RequestHeader, Action, Controller}
import models.formatter.WebPack._
import play.api.cache.Cached
import play.api.Play.current
import services.StreamingInfo
import scala.concurrent.ExecutionContext.Implicits.global

object StreamingInfoCtrl extends Controller{

  //Imports
  val streamingInfo = new StreamingInfo

  def getInfoFromAirPlay = Cached( requestParameter(_) , 10){
    Action.async {
      streamingInfo.getInfoFromAirPlay.map({info => Ok(Json.toJson(info))})
    }
  }

  def requestParameter(header: RequestHeader): String ={
    header.toString()
  }

}
