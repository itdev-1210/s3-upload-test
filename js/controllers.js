'use strict';
var controllers = angular.module('controllers', []);
controllers.controller('UploadController', ['$scope', function ($scope) {

  $scope.imageUrl = 'sajay';
  $scope.loading = false;
  $scope.upload = function () {
    $scope.loading = true;
    $scope.image = false;

    AWS.config.update({ accessKeyId: 'AKIAI7362N2P56KKHJLA', secretAccessKey: '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' });
    AWS.config.region = 'ap-south-1';
    AWS.config.signatureVersion = 'v4';
    let bucket = new AWS.S3({ params: { Bucket: 'webrex-test', ACL: 'public-read' } });
    if ($scope.file) {
      let params = {
        Key: new Date().getMilliseconds() + '-' + $scope.file.name,
        ContentType: $scope.file.type,
        Body: $scope.file,
        ServerSideEncryption: 'AES256',
       
      };
      console.log(params);
      bucket.upload(params, function (err, data) {
        if (err) {
          alert(err.message, err.code);
          $scope.loading = false;
          return false;
        }
        else {
          // Upload Successfully Finished
          console.log(data);

          $scope.imageUrl = data.Location;
          $scope.loading = false;
          $scope.image = true;

          // Reset The Progress Bar
          setTimeout(function () {
            $scope.$digest();
          }, 4000);
        }
      });
    }
    else {
      // No File Selected
      alert('Please select a file to upload');
    }
  }
}]);
