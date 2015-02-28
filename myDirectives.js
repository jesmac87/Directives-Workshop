var app = angular.module('myDirectives', []);


app.directive('pending', function($q, $timeout) {
    return {
        restrict: 'A',
        scope: {
            request: '&',
        },
        link: function(scope, elem, attrs) {


            //create a jqlite object for body element
            var body = angular.element(document).find('body');

            elem.bind('click', function() {
                //add css class to change pointer to progress while waiting for server response
                body.addClass('pointer');

                var deferred = $q.defer();
                elem.text('Pending...');
                elem.attr('disabled', true);
                scope.request().then(function(response) {

                    //timeout solely used to show that code works when making small requests
                    $timeout(function() {
                        elem.text('Submit');
                        elem.removeAttr('disabled');
                        body.removeClass('pointer');
                        deferred.resolve(response.data);
                    }, 1500);

                });

                return deferred.promise;

            });
        }
    };
});

app.directive('notify', function() {
    return {
        restrict: 'A',

        scope: {
            title: '=',
            body: '=',
            icon: '='
        },




        link: function(scope, element, attrs) {
            var Notification = window.Notification || window.mozNotification || window.webkitNotification;


            element.bind('click', function() {
                Notification.requestPermission(function(permission) {

                });

                var notification = new Notification(scope.title, {
                    body: scope.body,
                    icon: scope.icon,
                });


            });




        },



    };
});
