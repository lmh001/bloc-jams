var setSong = function(songNumber){
  if (currentSoundFile) {
     currentSoundFile.stop();
 }

	currentlyPlayingSongNumber = songNumber;
	currentSongFromAlbum = currentAlbum.songs[songNumber];
};

var getSongNumberCell = function(number){
  return$('.song-item-number[data-song-number="' + number + '"]');

};

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;

     var $row = $(template);
     var clickHandler = function() {
       var clickHandler = function() {
  	var songNumber = parseInt($(this).attr('data-song-number'));

  	if (currentlyPlayingSongNumber !== null) {
  		// Revert to song number for currently playing song because user started playing new song.
  		var currentlyPlayingCell = getSongNumberCell(number);
  		currentlyPlayingCell.html(currentlyPlayingSongNumber);
  	}
  	if (currentlyPlayingSongNumber !== songNumber) {
  		// Switch from Play -> Pause button to indicate new song is playing.

    	$(this).html(pauseButtonTemplate);
  		setSong(songNumber);
      currentSoundFile.play();
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
      currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
       // #2
       formats: [ 'mp3' ],
       preload: true
   });


     setVolume(currentVolume);
 };

 var setVolume = function(volume) {
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);
     }
 };
      updatePlayerBarSong();
  	} else if (currentlyPlayingSongNumber === songNumber) {
      +            if (currentSoundFile.isPaused()) {
  +                $(this).html(pauseButtonTemplate);
  +                $('.main-controls .play-pause').html(playerBarPauseButton);
  +                currentSoundFile.play();
  +            } else {
  +                $(this).html(playButtonTemplate);
  +                $('.main-controls .play-pause').html(playerBarPlayButton);
  +                currentSoundFile.pause();
  +            }
              }
  };


    var onHover = function(event) {
      var onHover = function(event) {
    var songNumberCell = parseInt($(this).find('.song-item-number'));
    var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSong) {
        songNumberCell.html(playButtonTemplate);
    }
};
    };
    var offHover = function(event) {
      var offHover = function(event) {
     var songNumberCell = parseInt($(this).find('.song-item-number'));
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));

     if (songNumber !== currentlyPlayingSong) {
         songNumberCell.html(songNumber);
         console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
     }
 };
    };

     $row.find('.song-item-number').click(clickHandler);
   // #2
   $row.hover(onHover, offHover);
   // #3
   return $row;
 };

 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     // #2
     $albumTitle.text(album.title);
       $albumArtist.text(album.artist);
       $albumReleaseInfo.text(album.year + ' ' + album.label);
       $albumImage.attr('src', album.albumArtUrl);

     // #3
     $albumSongList.empty();
     // #4
     for (var i = 0; i < album.songs.length; i++) {
       var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
$albumSongList.append($newRow);
 };

 var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};
var nextSong = function() {
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

    setSong(currentSongIndex + 1);
     currentSoundFile.play();

    // Save the last song number before changing it
    var lastSongNumber = currentlyPlayingSongNumber;

    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    updatePlayerBarSong();

    var $nextSongNumberCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
    var $lastSongNumberCell = parseInt($('.song-item-number[data-song-number="' + lastSongNumber + '"]'));

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};
 var updatePlayerBarSong = function() {

     $('.currently-playing .song-name').text(currentSongFromAlbum.title);
     $('.currently-playing .artist-name').text(currentAlbum.artist);
     $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
     $('.main-controls .play-pause').html(playerBarPauseButton);
 };
 var previousSong = function() {
     var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
     // Note that we're _decrementing_ the index here
     currentSongIndex--;
     setSong(currentSongIndex + 1);
          currentSoundFile.play();


     // Save the last song number before changing it
     var lastSongNumber = currentlyPlayingSongNumber;

     // Set a new current song
     currentlyPlayingSongNumber = currentSongIndex + 1;
     currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

     // Update the Player Bar information
     updatePlayerBarSong();

     $('.main-controls .play-pause').html(playerBarPauseButton);

     var $previousSongNumberCell = parseInt($('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]'));
     var $lastSongNumberCell = parseInt($('.song-item-number[data-song-number="' + lastSongNumber + '"]'));

     $previousSongNumberCell.html(pauseButtonTemplate);
     $lastSongNumberCell.html(lastSongNumber);
 };
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';
 // Store state of playing songs
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;
var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
});
    songRows[i].addEventListener('click', function(event) {
      clickHandler(event.target);

 });
}
 var albums = [albumPicasso, albumMarconi, albumCaprese];
 var index = 1;
     albumImage.addEventListener("click", function(event){
       setCurrentAlbum(albums[index]);
       index++;
       if(index == albums.length){
         index = 0;
       }
     });
