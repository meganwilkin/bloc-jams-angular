(function() {
     function PlayerBarCtrl(Fixtures, SongPlayer) {
         this.albumData = Fixtures.getAlbum();
         this.songPlayer = SongPlayer;
         //console.log(this.albumData);
     }
 
     angular
         .module('blocJams')
         .controller('PlayerBarCtrl', ['Fixtures', 'SongPlayer', PlayerBarCtrl]);
 })();