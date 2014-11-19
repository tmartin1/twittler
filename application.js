$(document).ready(function() {
  refreshTweets();

});

function refreshTweets() {
  var $tweetDisplay = $('#tweetDisplay');
  $tweetDisplay.html('');

  var index = streams.home.length - 1;
  while(index >= 0) {
    var tweet = streams.home[index];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($tweetDisplay);
    index -= 1;
  }
};