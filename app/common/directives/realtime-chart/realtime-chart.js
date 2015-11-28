'use strict';

angular.module('dashboard.charting', [])

.controller('Ctrl', function($scope) {
    $scope.data = [[[0, 1], [1, 5], [2, 2]]];
})

.directive('realtimeChart', function(){
    return {
      restrict: 'A',
      link: function(scope, ele, attrs) {
        var data, getRandomData, plot, totalPoints, update, updateInterval;
        data = [];
        totalPoints = 300;

        // Returns Random Data to display on Graph
        getRandomData = function() {
          var i, prev, res, y;
          if (data.length > 0) {
            data = data.slice(1);
          }
          while (data.length < totalPoints) {
            prev = (data.length > 0 ? data[data.length - 1] : 50);
            y = prev + Math.random() * 10 - 5;
            if (y < 0) {
              y = 0;
            } else {
              if (y > 100) {
                y = 100;
              }
            }
            data.push(y);
          }
          res = [];
          i = 0;
          while (i < data.length) {
            res.push([i, data[i]]);
            ++i;
          }
          return res;
        };

        // Updates the graph
        update = function() {
          plot.setData([getRandomData()]);
          plot.draw();
          setTimeout(update, updateInterval);
        };

        data = [];
        totalPoints = 300;
        updateInterval = 200;
        plot = $.plot(ele[0], [getRandomData()], {
          series: {
            lines: {
              show: true,
              fill: true
            },
            shadowSize: 0
          },
          yaxis: {
            min: 0,
            max: 100
          },
          xaxis: {
            show: false
          },
          grid: {
            hoverable: true,
            borderWidth: 1,
            borderColor: '#eeeeee'
          },
          colors: ["#5BA0D3"]
        });

        return update();
      }
    };
});
