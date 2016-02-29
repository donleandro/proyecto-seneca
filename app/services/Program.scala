package services

import com.google.inject.Singleton
import models.Program
import play.api.libs.json.JsValue
import play.api.libs.ws.WS
import play.api.Play.current
import scala.concurrent.Future
import scala.concurrent.ExecutionContext.Implicits.global

/**
  * Created by davidmesa on 2/28/16.
  */
@Singleton
class Program {

  val WordPressUrl = "http://localhost:3000/?json="

  def getPrograms(): Future[List[models.Program]] = {
    WS.url(WordPressUrl+"get_category_index").get().map({
      categoryResponse =>
        val JCategoryResponse = categoryResponse.json
        val categoriesId =(JCategoryResponse \ "categories").as[List[JsValue]].map {
          category =>
            (category \ "id").as[Int]
        }.mkString(",")
        WS.url(WordPressUrl+"get_posts&cat="+categoriesId+"&post_type=program&count=100")
          .get().map({
          programResponse =>
            (programResponse.json \ "posts").as[List[JsValue]].map({
              program =>
                val customFields = (program \ "custom_fields").as[JsValue]
                val images = (program \ "attachments").as[List[JsValue]].map({
                  attachment =>
                    (attachment \ "id").as[Int] -> (attachment \ "url").as[String]
                }).toMap
                Program(
                  (program\"slug").as[String],
                  (program\"title").as[String],
                  (customFields \ "slogan").as[List[String]].head,
                  images((customFields \ "image").as[List[String]].head.toInt),
                  (customFields \ "description").as[List[String]].head,
                  (customFields \ "producer").as[List[String]].head.split(";").toList,
                  (customFields \ "email").as[List[String]].head
                  )
            })
        })
    }).flatMap(identity)
  }

}
