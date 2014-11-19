$(document).ready(function() {
  refreshTweets();
});

// Automatically refresh tweets every second.
window.setInterval(function() {
  refreshTweets();
}, 1000);

function refreshTweets() {
  var $tweetDisplay = $('#tweetDisplay');
  $tweetDisplay.html('');

  var index = streams.home.length - 1;
  display = 11;
  count = 0;
  while(display >= 0) {
    var tweet = streams.home[index-count];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message + ' (' + formatDate(tweet.created_at) + ')');
    $tweet.appendTo($tweetDisplay);
    display--;
    count++;
  }
};

function formatDate(dateIn) {
  var result = "";
  dateIn += "";
  var dateArr = dateIn.split(' ');
  result = monAsNumber(dateArr[1])+"/"+dateArr[2]+"/"+dateArr[3]+" at "+stdTime(dateArr[4]);
  return result;
}

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
}

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
}