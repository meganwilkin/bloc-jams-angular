(function () {
    function AlbumCtrl() {
        this.albumData = [];
        this.albumData = angular.copy(albumPicasso.songs);
        
        this.title = albumPicasso.title;
        this.artist = albumPicasso.artist;
        this.year = albumPicasso.year;
        this.label = albumPicasso.label;
    }
    


    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();
