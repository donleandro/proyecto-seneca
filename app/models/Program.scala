package models

/**
  * Created by davidmesa on 2/28/16.
  */
case class Program (
                     slug : String,
                     name: String,
                     slogan: String,
                     image: String,
                     description: String,
                     producers: List[String],
                     email: String
                   )
