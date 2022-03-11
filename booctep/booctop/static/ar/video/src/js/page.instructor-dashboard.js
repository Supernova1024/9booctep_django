(function(){
  'use strict';

  var earnings = []
  var prev = []
  var backgroundColor = []

  // Create a date range for the last 7 days
  var start = moment().subtract(6, 'days').format('YYYY-MM-DD') // 7 days ago
  var end = moment().format('YYYY-MM-DD') // today
  var range = moment.range(start, end)

  // Create the earnings graph data
  // Iterate the date range and assign a random ($) earnings value for each day
  range.by('days', function(m) {
    earnings.push({
      y: Math.floor(Math.random() * 300) + 30,
      x: m.toDate()
    })
    prev.push({
      y: Math.floor(Math.random() * 300) + 10,
      x: m.toDate()
    })

    if (m.startOf('day').isSame(moment().startOf('day'))) {
      backgroundColor.push(settings.colors.accent[500])
    }
    else {
      backgroundColor.push(settings.colors.primary[500])
    }
  })

  var Earnings = function(id, type = 'roundedBar', options = {}) {
    options = Chart.helpers.merge({
      barRoundness: 1.2,
      title: {
        display: true,
        fontSize: 12,
        fontColor: 'rgba(54, 76, 102, 0.54)',
        position: 'top',
        text: 'GENERATED INCOME'
      },
      scales: {
        yAxes: [{
          ticks: {
            maxTicksLimit: 4
          }
        }],
        xAxes: [{
          offset: true,
          ticks: {
            padding: 10
          },
          gridLines: {
            display: false
          },
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'D/MM'
            },
            maxTicksLimit: 7
          }
        }]
      }
    }, options)

    var data = {
      datasets: [{
        label: "Previous Week",
        data: prev,
        barThickness: 20
      }, {
        label: "Last Week",
        data: earnings,
        barThickness: 20
      }]
    }

    Charts.create(id, type, options, data)
  }

  // Create Chart
  Earnings('#earningsChart')

})()