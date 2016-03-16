package services

import com.google.inject.Singleton
import exceptions.EpisodeProgramMismatchException
import models.{ProgramLight, Episode}
import play.api.libs.json.JsValue
import play.api.libs.ws.WS
import play.api.Play.current
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Created by davidmesa on 3/16/16.
  */
@Singleton
class HomeService {

  val WordPressUrl = "http://wordpress.proyectoseneca.com/?json="
  val format = new java.text.SimpleDateFormat("yyyyMMdd")

  def getHomeInfo(): Future[List[ProgramLight]] = {
    WS.url(WordPressUrl+"get_category_posts&post_type=episode&category_slug=home")
      .get().map({
        episodesResponse =>
          Future.sequence((episodesResponse.json \ "posts").as[List[JsValue]].map({
            episode =>
              val episodeCustomFields = episode \ "custom_fields"
              val programCategory = (episode \ "categories").as[List[JsValue]].map(_.\("slug").as[String]).filter(_ != "home")
              if(programCategory.length == 1){
                WS.url(WordPressUrl+"get_posts&post_type=program&category_id="+programCategory.head)
                  .get().map({
                  programResponse =>
                    (programResponse.json \ "posts").as[List[JsValue]].map({
                      program =>
                        val customFields = (program \ "custom_fields").as[JsValue]
                        val images = (program \ "attachments").as[List[JsValue]].map({
                          attachment =>
                            (attachment \ "id").as[Int] -> (attachment \ "url").as[String]
                        }).toMap

                        ProgramLight(
                          (program\"slug").as[String],
                          (program\"title").as[String],
                          images((customFields \ "image").as[List[String]].head.toInt),
                          (customFields \ "producer").as[List[String]].head.split(";").toList,
                          Episode(
                            (episode \ "slug").as[String],
                            (episode \ "title").as[String],
                            format.parse((episodeCustomFields \ "transmission_date").as[List[String]].head),
                            (episodeCustomFields \ "soundcloud_url").as[List[String]].head,
                            (episodeCustomFields \ "tags").as[List[String]].head.split("\r\n").toList,
                            (episodeCustomFields \ "description").as[List[String]].head
                          )
                        )
                    }).head
                })
              } else throw new EpisodeProgramMismatchException
          }))
      }).flatMap(identity)
  }

}
