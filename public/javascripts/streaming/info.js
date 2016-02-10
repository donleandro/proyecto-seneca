/**
 * Created by jsrolon on 2/6/16.
 */
$(document).ready(function () {
    getSongInfo(0); // get the info immediately
});

function showSongInfo(songInfo) {
    $("#song-name").html(songInfo.song.name);
    $("#song-artist").html(songInfo.song.author);
    $("#song-picture").attr("src", songInfo.song.url);
}

function getSongInfo(delay) {
    window.setTimeout(function () {
        $.getJSON("/api/airtimeInfo", function(airtimeInfo) {
            showSongInfo(airtimeInfo);

            // calculate next delay
            var endTime = new Date(airtimeInfo.song.ends.replace(" ", "T") + "Z");
            var currentTime = new Date();
            console.log(endTime);
            getSongInfo((endTime - currentTime) + 1000);
        });
    }, delay);
}
