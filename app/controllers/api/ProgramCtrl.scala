/**
  * Created by davidmesa on 2/28/16.
  */
package controllers.api

import play.api.cache.Cached
import play.api.libs.json.Json
import play.api.mvc.{RequestHeader, Action, Controller}
import models.formatter.WebPack._
import services.ProgramService
import play.api.Play.current
import scala.concurrent.ExecutionContext.Implicits.global


object ProgramCtrl extends Controller{

  //Imports
  val programService = new ProgramService

  def getPrograms = Cached( requestParameter(_) , 14400) {
    Action.async {
      programService.getPrograms().map({programs => Ok(Json.toJson(programs))})
    }
  }

  def getProgram(slug: String) = Cached( requestParameter(_) , 14400) {
    Action.async {
      programService.getProgram(slug).map({program => Ok(Json.toJson(program))})
    }
  }

  def requestParameter(header: RequestHeader): String ={
    header.toString()
  }

}
