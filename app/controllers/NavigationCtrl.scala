package controllers

import play.api.mvc._

object NavigationCtrl extends Controller {

  def main(any: String) = Action {
    if(any.contains("programs")) {
      val urlInfo = any.split("/")
      if(urlInfo.length == 2){
        val nameWords = urlInfo.last.split("-").map(_.capitalize).mkString(" ").filter(!_.isDigit)
        Ok(views.html.index( nameWords + " - Proyecto Séneca" ))
      } else
        Ok(views.html.index("Proyecto Séneca"))
    } else
      Ok(views.html.index("Proyecto Séneca"))
  }

  def header = Action {
    Ok(views.html.includes.header())
  }

  def footer = Action {
    Ok(views.html.includes.footer())
  }

  def home = Action {
    Ok(views.html.home.index())
  }

  def programs = Action {
    Ok(views.html.program.index())
  }

  def program = Action {
    Ok(views.html.program.program())
  }

  def streaming = Action {
    Ok(views.html.player.index())
  }

  def aboutUs = Action {
    Ok(views.html.aboutUs())
  }

  def convocatoria = Action{
    Ok(views.html.convocatoria())
  }

  def siteMap = Action {
    Ok(views.xml.sitemap.render())
  }

}