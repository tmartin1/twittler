var currentUser = null;

$(document).ready(function() {
  refreshTweets();
  loadFollowingList();

  $("#newTweet").keypress(function(key) {
    if(key.which === 13) submitTweet();
  });

});

// Automatically refresh tweets five seconds.
window.setInterval(function() {
  refreshTweets();
}, 5000);

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

  for (var i=tweetArr.length-1; i>0; i--) {
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
  $timestamp.text(' ' + formatTimestamp(time));
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

function submitTweet() {
  signIn();
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

function signInOut() {
  if (!currentUser) signIn();
  else signOut();
}

function signIn() {
  if (!currentUser) {
    currentUser = prompt("What is your username?");
    streams.users[currentUser] = [];
    $("#userTitle").html('');
    var $userTitle = $('#userTitle');
    var $nameTitle = $("<a class='username' href='#' onclick=\"showHistory(\'"+currentUser+"\')\"'></a>");
    $nameTitle.text("@"+currentUser);
    $nameTitle.appendTo($userTitle);
    $("#signInOut").html('Log Out');
  }
};

function signOut() {
  currentUser = null;
  $("#signInOut").html('Sign In');
  $("#userTitle").html('Following')
}

function formatTimestamp(dateIn) {
  var now = new Date();
  var result = "";

  var years = now.getYear() - dateIn.getYear();
  if (years > 1) return years+" years ago";
  if (years === 1) return "Last year"

  var months = now.getMonth() - dateIn.getMonth();
  if (months > 1) return months+" months ago";
  if (months === 1) return "Last month";

  var days = now.getDate() - dateIn.getDate();
  if (days > 1) return days+" days ago";
  if (days === 1) return "Yesterday";

  var hours = now.getHours() - dateIn.getHours();
  if (hours > 1) return hours+" hours ago";
  if (hours === 1) return "1 hour ago";

  var minutes = now.getMinutes() - dateIn.getMinutes();
  if (minutes > 1) return minutes+" minutes ago";
  return "just now"
};
