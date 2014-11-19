$(document).ready(function() {
  refreshTweets();

});

function refreshTweets() {
  var $tweetDisplay = $('#tweetDisplay');
  $tweetDisplay.html('');

  var index = streams.home.length - 1;
  display = 11;
  count = 0;
  while(display >= 0) {
    var tweet = streams.home[index-count];
    var $tweet = $('<div></div>');
    $tweet.text('@' + tweet.user + ': ' + tweet.message);
    $tweet.appendTo($tweetDisplay);
    display--;
    count++;
  }
};