/**
 * Created by jsrolon on 2/6/16.
 */
$(document).ready(function () {
    getSongInfo(0); // get the info immediately at start
});

function showSongInfo(songInfo) {
    $(".programImageDiv").height(0);
    $(".song-info-panel").height(300);
    $("#song-name").html(songInfo.song.name);
    $("#song-artist").html(songInfo.song.author);
    if(songInfo.song.url != null) {
        $("#song-picture").attr("src", songInfo.song.url);
        $("#song-picture-wrapper").height(300);
        $("#song-picture").css("opacity", 1);
    } else {
        $("#program-image").css("margin-top", "70px");
        $("#song-picture").css("opacity", 0);
        $("#song-picture-wrapper").height(0);
    }
    $(".song-info-text").css("opacity", 1);
}

function hideSongInfo() {
    $(".programImageDiv").height(300);
    $("#program-image").css("margin-top", "0");
    $(".song-info-panel").height(0);
    $("#song-name").html("");
    $("#song-artist").html("");
    $("#song-picture").css("opacity", 0);
    $(".song-info-text").css("background-color", "rgba(0,0,0,0)");
    $(".song-info-text").css("opacity", 0);
    $("#song-picture-wrapper").height(0);
}

function getSongInfo(delay) {
    window.setTimeout(function () {
        $.getJSON("/api/airtimeInfo", function(airtimeInfo) {
            var nextDelay = 30000; // ask every 30 seconds if no song is broadcasting
            if(!$.isEmptyObject(airtimeInfo)) {
                if(typeof airtimeInfo.song != "undefined") {
                    showSongInfo(airtimeInfo);

                    // calculate next delay
                    var endTime = new Date(airtimeInfo.song.ends.replace(" ", "T") + "Z");
                    var currentTime = new Date();
                    nextDelay = (endTime - currentTime) + 5000; // add 5s because of airtime api lag
                } else {
                    // no songs broadcasting, clean up
                    hideSongInfo();
                }
            }
            getSongInfo(nextDelay);
        });
    }, delay);
}
