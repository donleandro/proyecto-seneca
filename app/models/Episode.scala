package models

import java.util.Date

/**
  * Created by davidmesa on 2/29/16.
  */
case class Episode (
                     slug: String,
                     title: String,
                     transmissionDate: Date,
                     soundcloudUrl: String,
                     tags: List[String],
                     description: String
                   )
