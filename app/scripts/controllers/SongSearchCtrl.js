(function() {
     function SongSearchCtrl($scope) {
         $scope.searchtext = "hello";
         
         
         $scope.searchTextChanged = function() {
             console.log($scope.searchtext);
         };
         
     }
 
     angular
         .module('blocJams')
         .controller('SongSearchCtrl', ['$scope', SongSearchCtrl]);
 })();