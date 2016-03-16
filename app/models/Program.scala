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

case class ProgramExtended (
                             slug : String,
                             name: String,
                             slogan: String,
                             image: String,
                             description: String,
                             producers: List[String],
                             email: String,
                             episodes: List[Episode]
                           )

case class ProgramLight (
                          slug : String,
                          name: String,
                          image: String,
                          producers: List[String],
                          lastEpisode: Episode
                        )
