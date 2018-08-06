(function () {
    'use strict';

    angular.module('app.txs')
        .controller('txsCtrl', ['$scope', '$filter', '$routeParams', '$location', '$http', 'appConfig', 'utilities', txsCtrl]);

    function txsCtrl($scope, $filter, $routeParams, $location, $http, appConfig, utilities) {

        var path = $location.path();
        var name = $routeParams.name;

        if(name) {
            if (path.includes("txs")) {
                $http.get(appConfig.urls.elasticsearch_wrapper + "/get_trx?trx=" + name + "&size=1000")
                    .then(function(response) {

                        var operations_id = [];
                        var operations = [];

                        $scope.data = {name: name, block_num: response.data[0].block_data.block_num,
                        date: response.data[0].block_data.block_time};

                        angular.forEach(response.data, function (value, key) {


                            var op_id = value.account_history.operation_id

                            if (operations_id.indexOf(op_id)==-1) {

                                operations_id.push(op_id)
                                var op = utilities.operationType(value.operation_type);
                                var op_type = op[0];
                                var op_color = op[1];

                                var parsed = {
                                    operation_id: op_id,
                                    op_color: op_color,
                                    op_type: op_type
                                };

                                var opArray = JSON.parse(value.operation_history.op);
                                var operation_text = "";
                                operation_text = utilities.opText(appConfig, $http, opArray[0], opArray[1], function (returnData) {
                                    parsed.operation_text = returnData;
                                });
                                operations.push(parsed);
                            }
                        });
                        $scope.operations = operations;
                        $scope.data.counter = operations.length
                    });

            }
        }
        else {
            if (path == "/txs") {

                $http.get(appConfig.urls.elasticsearch_wrapper + "/get_trxs?from_date=now-10d&to_date=now&size=30")
                    .then(function (response) {

                        //console.log(response.data);
                        var transactions = [];
                        angular.forEach(response.data, function (value, key) {
                            //console.log(value);
                            var parsed = {trx_id: value.key, count: value.per_op.buckets.length};
                            //if(counter <= 10)
                            transactions.push(parsed);
                        });
                        $scope.transactions = transactions;
                    });

            }
        }
    }

})();
