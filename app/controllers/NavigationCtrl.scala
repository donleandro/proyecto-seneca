package controllers

import play.api.mvc._

object NavigationCtrl extends Controller {

  def index = Action {
    Ok(views.html.index("Your new application is ready."))
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