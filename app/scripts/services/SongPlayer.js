(function () {
    function SongPlayer() {
        var SongPlayer = {};
        
        /**
        * @desc currentSong playing or paused, null if nothing playing.
        * @type {object}
        */
        var currentSong = null;
        
         /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function playSong
        * @desc  plays currently selected song
        * @param {object} song
        */
        var playSong = function(song) {
                currentBuzzObject.play();
                song.playing = true;
        }

        /**
        * @desc plays newly selected song or plays song that was previously paused
        * @type {Object}
        */
        SongPlayer.play = function (song) {
            if (currentSong !== song) {
                /**
                * @function setSong
                * @desc Stops currently playing song and loads new audio file as currentBuzzObject
                * @param {Object} song
                */
                var setSong = function(song) {
                    if (currentBuzzObject) {
                        currentBuzzObject.stop();
                        currentSong.playing = null;
                    }
 
                    currentBuzzObject = new buzz.sound(song.audioUrl, {
                        formats: ['mp3'],
                        preload: true
                    });
 
                    currentSong = song;
                };
                
                setSong(song);

                playSong(song);
                
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();