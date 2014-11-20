var currentUser = null;

$(document).ready(function() {
  refreshTweets();
  loadFollowingList();

  $("#newTweet").keypress(function(key) {
    if(key.which === 13) submitTweet();
  });

});

// Automatically refresh tweets five seconds.
/*
window.setInterval(function() {
  refreshTweets();
}, 5000);*/

function loadFollowingList() {
  var $followingList = $('#followingList');
  
  for (var i=0; i<users.length; i++) {
    var $following = $("<div class='following'></div>");
    var $username = $("<a class='username' href='#' onclick=\"showHistory(\'"+users[i]+"\')\"'></a>");
    $username.text('@' + users[i]);
    $username.appendTo($following);
    $following.appendTo($followingList);
  }
};

function refreshTweets() {
  var $tweets = $('#tweets');
  $tweets.html('');

  var index = streams.home.length - 1;
  display = 10;
  count = 0;
  while(display >= 0) {
    var tweet = streams.home[index-count];
    var $tweet = displayTweet(tweet.user, tweet.message, tweet.created_at);
    $tweet.appendTo($tweets);
    display--;
    count++;
  }
};

function showHistory(name) {
  $("#tweets").slideUp("slow");
  $("#userHistory, #goHome").slideDown("slow");
  $("#viewTitle").text("@"+name+" Twittler History");

  var $userTweets = $('#userTweets');
  $userTweets.html('');
  var tweetArr = streams.users[name];

  for (var i=0; i<tweetArr.length; i++) {
    var tweet = tweetArr[i];
    var $tweet = displayTweet(name, tweet.message, tweet.created_at);
    $tweet.appendTo($userTweets);
  }
};

function displayTweet(user, message, time) {
  var $tweet = $("<div class='tweet'></div>");

  var $username = $("<a class='username' href='#' onclick=\"showHistory(\'"+user+"\')\"'></a>");
  $username.text('@' + user);
  $username.appendTo($tweet);
  
  var $timestamp = $("<span class='timestamp'></span>");
  $timestamp.text(' ' + formatDate(time));
  $timestamp.appendTo($tweet);

  var $message = $("<br><span class='message'></span>");
  $message.text(' ' + message);
  $message.appendTo($tweet);
  return $tweet;
};

function showCurrent() {
  $("#userHistory, #goHome").slideUp("slow");
  $("#tweets").slideDown("slow");
  $("#viewTitle").text("What's Twittling Now");

  refreshTweets();
};

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

function submitTweet() {
  if (!currentUser) {
    currentUser = prompt("What is your username?");
    streams.users[currentUser] = [];
    $("#userTitle").html("@"+currentUser);
  }

  var tweet = {
    "user": currentUser,
    "message": $("#newTweet").val(),
    "created_at": new Date()
  };
  streams.users[currentUser].push(tweet);
  streams.home.push(tweet);
  refreshTweets();
  $("#newTweet").val('');
};


