(function () {
    function SongPlayer(Fixtures) {
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
        * @desc changes current sont to one before
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
        * @desc
        * @type
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

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
