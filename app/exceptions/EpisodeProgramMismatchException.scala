package exceptions

/**
  * Created by davidmesa on 3/16/16.
  */
class EpisodeProgramMismatchException(message: String = "The episode doesn't have a program to match with." +
                                               "\nBad Wordpress configuration",
                                      cause: Throwable = null) extends RuntimeException(message, cause)

