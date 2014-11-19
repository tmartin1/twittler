$(document).ready(function() {
  refreshTweets();
});

// Automatically refresh tweets five seconds.
/*
window.setInterval(function() {
  refreshTweets();
}, 5000);*/

function refreshTweets() {
  var $tweets = $('#tweets');
  $tweets.html('');

  var index = streams.home.length - 1;
  display = 10;
  count = 0;
  while(display >= 0) {
    var tweet = streams.home[index-count];
    var $tweet = $("<div class='tweet'></div>");

    var user = tweet.user + '';
    var $username = $("<a class='username' href='#' onclick=\"userHistory(\'"+user+"\')\"'></a>");
    $username.text('@' + user);
    $username.appendTo($tweet);
    
    var $timestamp = $("<span class='timestamp'></span>");
    $timestamp.text(' ' + formatDate(tweet.created_at));
    $timestamp.appendTo($tweet);

    var $message = $("<br><span class='message'></span>");
    $message.text(' ' + tweet.message);
    $message.appendTo($tweet);

    $tweet.appendTo($tweets);
    display--;
    count++;
  }
};

function userHistory(name) {
  $("#tweets").hide();
  $("#userTweets").show();
  $("#viewTitle").text("@"+name+" Twittler History");


  
};

function showCurrent() {
  $("#userTweets").hide();
  $("#tweets").show();
  $("#viewTitle").text("What's Twittling Now");
}

function formatDate(dateIn) {
  var result = "";
  dateIn += "";
  var dateArr = dateIn.split(' ');
  result = monAsNumber(dateArr[1])+"/"+dateArr[2]+"/"+dateArr[3]+" at "+stdTime(dateArr[4]);
  return result;
};

function monAsNumber(mon) {
  var months = {
    "Jan": 1,
    "Feb": 2,
    "Mar": 3,
    "Apr": 4,
    "May": 5,
    "Jun": 6,
    "Jul": 7,
    "Aug": 8,
    "Sep": 9,
    "Oct": 10,
    "Nov": 11,
    "Dec": 12
  };
  return months[mon];
};

function stdTime(time) {
  var result = "";
  var ampm = "am";
  var timeArr = time.split(":");
  if (timeArr[0] > 11) {
    ampm = "pm";
    if (timeArr[0] > 12) timeArr[0] -= 12;
  }
  result += timeArr[0]+":"+timeArr[1]+ampm;
  return result;
};