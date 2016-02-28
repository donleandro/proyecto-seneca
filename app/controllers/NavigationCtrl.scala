package controllers

import play.api.mvc._

object NavigationCtrl extends Controller {

  def main(any: String) = Action {
    Ok(views.html.index())
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

  def program = Action {
    Ok(views.html.program.index())
  }

  def streaming = Action {
    Ok(views.html.player.index())
  }

  def aboutUs = Action {
    Ok(views.html.aboutUs())
  }

}