(function(){
  'use strict';

  var earnings = []

  // Create a date range for the last 7 days
  var start = moment().subtract(6, 'days').format('YYYY-MM-DD') // 7 days ago
  var end = moment().format('YYYY-MM-DD') // today
  var range = moment.range(start, end)

  // Create the earnings graph data
  // Iterate the date range and assign a random ($) earnings value for each day
  range.by('days', function(moment) {
    earnings.push({
      y: Math.floor(Math.random() * 200) + 15,
      x: moment.toDate()
    })
  })

  var WeekIQChart = function(id, type = 'line', options = {}) {
    options = Chart.helpers.merge({
      scales: {
        yAxes: [{
          ticks: {
            maxTicksLimit: 4
          }
        }],
        xAxes: [{
          gridLines: {
            display: false
          },
          type: 'time',
          distribution: 'series',
          time: {
            unit: 'day',
            stepSize: 1,
            autoSkip: false,
            displayFormats: {
              day: 'ddd'
            }
          }
        }]
      }
    }, options)

    var data = {
      datasets: [{
        label: "Experience IQ",
        data: earnings
      }]
    }

    Charts.create(id, type, options, data)
  }

  var TopicIQChart = function(id, type = 'radar', options = {}) {
    var data = {
      labels: ["JavaScript", "HTML", "Flinto", "Vue.js", "Sketch", "Priciple", "CSS", "Angular"],
      datasets: [{
        label: "Experience IQ",
        data: [30, 35, 33, 32, 31, 30, 28, 36],
        borderJoinStyle: 'bevel',
        lineTension: .1
      }]
    }

    Charts.create(id, type, options, data)
  }

  // Create Chart
  WeekIQChart('#iqChart')
  TopicIQChart('#topicIqChart')

})()