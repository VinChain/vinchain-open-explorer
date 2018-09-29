(function() {
    'use strict';

    angular.module('app')
        .factory('appConfig', [appConfig]);


    angular.module('app').config(['AnalyticsProvider', function (AnalyticsProvider) {
        // Add configuration code as desired
        AnalyticsProvider.setAccount('UA-101388661-2');  //UU-XXXXXXX-X should be your tracking code
    }]).run(['Analytics', function(Analytics) { }]);

    function appConfig() {
        var pageTransitionOpts = [
            {
                name: 'Fade up',
                "class": 'animate-fade-up'
            }, {
                name: 'Scale up',
                "class": 'ainmate-scale-up'
            }, {
                name: 'Slide in from right',
                "class": 'ainmate-slide-in-right'
            }, {
                name: 'Flip Y',
                "class": 'animate-flip-y'
            }
        ];
        var date = new Date();
        var year = date.getFullYear();
        var main = {
            brand: 'Vinchain Explorer',
            name: 'oxarbitrage',
            api_link: 'https://github.com/VinChain/vinchain-python-api-backend',
            source_code_link: 'https://github.com/VinChain/vinchain-open-explorer',
            year: year,
            pageTransition: pageTransitionOpts[0]
        };
        var color = {
            primary:    '#4E7FE1',
            success:    '#81CA80',
            info:       '#6BBCD7',
            infoAlt:    '#7266BD',
            warning:    '#E9C842',
            danger:     '#E96562',
            gray:       '#DCDCDC'
        };

        var server_ip = "192.168.3.11"
        var urls = {
			websocket: "ws://" + server_ip + ":8090/ws",
            python_backend: "http://" +  server_ip +":5000",
			elasticsearch_wrapper: "http://" + server_ip + ":5010", // clockwork
            udf_wrapper: "http://127.0.0.1:5001"
        };

        return {
            pageTransitionOpts: pageTransitionOpts,
            main: main,
            color: color,
            urls: urls
        }
    }


})();
