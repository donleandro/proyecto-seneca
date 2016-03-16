/**
  * Created by davidmesa on 2/28/16.
  */
package controllers.api

import models.formatter.WebPack._
import play.api.Play.current
import play.api.cache.Cached
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller, RequestHeader}
import services.HomeService

import scala.concurrent.ExecutionContext.Implicits.global


object HomeCtrl extends Controller{

  //Imports
  val homeService = new HomeService

  def getHomeEpisodes = Cached( requestParameter(_) , 14400) {
    Action.async {
      homeService.getHomeInfo().map({lightPrograms => Ok(Json.toJson(lightPrograms))})
    }
  }

  def requestParameter(header: RequestHeader): String ={
    header.toString()
  }

}
