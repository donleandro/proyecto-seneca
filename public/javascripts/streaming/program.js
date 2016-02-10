/**
 * Created by davidmesa on 2/6/16.
 */
$(document).ready(function () {
    window.setInterval(function () {
        $.getJSON("/api/airtimeInfo", function(airtimeInfo) {
            showSongInfo(airtimeInfo);
        });
    }, 25000); // ask every 25 seconds
});

function showSongInfo(songInfo) {
    $("#song-name").html(songInfo.song.name);
    $("#song-artist").html(songInfo.song.author);
    $("#song-picture").attr("src", songInfo.song.url);
}
