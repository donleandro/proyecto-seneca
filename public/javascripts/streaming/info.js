/**
 * Created by jsrolon on 2/6/16.
 */

//Variables used for progress bar
var programTimer;
var airtimeInfoGlobal;

$(document).ready(function () {
    getSongInfo(0); // get the info immediately at start
});

function showSongInfo(songInfo) {
    $(".programImageDiv").height(0);
    $(".song-info-panel").height(300);
    $("#song-name").html(songInfo.song.name);
    $("#song-artist").html(songInfo.song.author);
    $("#song-picture").attr("src", songInfo.song.url);
    $(".song-picture-wrapper").height(300);
    $(".song-info-text").css("opacity", 1);
}

function hideSongInfo() {
    $(".programImageDiv").height(300);
    $(".song-info-text").css("opacity", 0);
    $(".song-info-panel").height(0);
    $(".song-picture-wrapper").height(0);
}

function setProgram(songInfo) {
    $("#program-image").attr("src", songInfo.program.url);
    $("#program-name").html(songInfo.program.name);
    $("#air-state").html("On Air");
    airtimeInfoGlobal = songInfo
    if(programTimer) clearTimeout(programTimer);
    animateUpdate(songInfo)
}

function getSongInfo(delay) {
    window.setTimeout(function () {
        $.getJSON("/api/airtimeInfo", function(airtimeInfo) {
            var nextDelay = 15000; // ask every 15 seconds if no song is broadcasting
            if(!$.isEmptyObject(airtimeInfo)) {
                if(typeof airtimeInfo.program != "undefined")
                    setProgram(airtimeInfo);
                if(typeof airtimeInfo.song != "undefined" && airtimeInfo.song.url != null) {
                    showSongInfo(airtimeInfo);
                    // calculate next delay
                    var endTime = new Date(airtimeInfo.song.ends.replace(" ", "T") + "Z");
                    var currentTime = new Date();
                    nextDelay = (endTime - currentTime) + 10000; // add 10s because of airtime api lag
                } else {
                    // no songs broadcasting, clean up
                    hideSongInfo();
                }
            }
            else {
                $("#air-state").html("Off Air");
            }
            getSongInfo(nextDelay);
        });
    }, delay);
}

function animateUpdate() {
    var endTime = new Date(airtimeInfoGlobal.program.ends.replace(" ", "T") + "Z");
    var startTime = new Date(airtimeInfoGlobal.program.starts.replace(" ", "T") + "Z");
    var currentTime = new Date();
    var programProgress = Math.round((currentTime - startTime) /  (endTime - startTime)*100);
    if (programProgress <= 100) {
        $("#progress-bar").css("width", programProgress+"%");
        programTimer=setTimeout(animateUpdate, Math.floor((endTime.getTime() - startTime.getTime())/100));
    }
}
