(function () {
    function SongPlayer($rootScope, Fixtures) {
        var SongPlayer = {};
        /**
        * @desc store album information
        * @type {object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
         * @function playSong
         * @desc  plays currently selected song
         * @param {object} song
         */
        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true;
            
        }

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function (song) {
            if (currentBuzzObject) {
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
                stopSong(song)
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });
            
            // Automatically start playing next song
            currentBuzzObject.bind('ended', function() {
                SongPlayer.next();
            });

            SongPlayer.currentSong = song;
        };
        
        /**
        * @function getSongIndex
        * @desc get number of song playing
        * @param {object} song
        * @return {number}
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
            };
        
        /**
        * @function stopSong
        * @desc 
        * @param
        */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        }
        
        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;
        
        /**
         * @desc currentSong playing or paused, null if nothing playing.
         * @type {object}
         */
        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        /**
        * @desc Current volume
        * @type {Number}
        */
        SongPlayer.volume = 80;
        
        /**
        * @desc Current volume
        * @type {Number}
        */
        SongPlayer.volumeMax = 100;
        

        
//          if (this.currentSong.isEnded()) {
//            console.log("song ended");  
//          };
                
        
        /**
         * @desc plays newly selected song or plays song that was previously paused
         * @type {Object}
         */
        SongPlayer.play = function (song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {

                setSong(song);

                playSong(song);

            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            } 
        };

        /**
         * @desc pauses if a song is already playing
         * @type {Object}
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /**
        * @desc changes current song to one before
        * @type {Object}
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @desc changes current song to one after
        * @type {Object}
        */
        SongPlayer.next = function(song) {
         var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex == currentAlbum.songs.length) {
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        }
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        SongPlayer.setCurrentTime = function(time) {
            SongPlayer.currentTime = time;
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };
        
        /**
        * @function setVolume
        * @desc set volume of currently palying song
        * @param {Number} volume
        */
       SongPlayer.setVolume = function(volume) {
           SongPlayer.volume = volume;
           if (currentBuzzObject) {
               currentBuzzObject.setVolume(volume);
           }
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
