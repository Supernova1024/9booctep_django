/* custom tooltip */
const customTooltips = function (tooltip) {
  // Tooltip Element
  let tooltipEl = document.querySelector(".chartjs-tooltip");

  if (!this._chart.canvas.closest(".parentContainer").contains(tooltipEl)) {
    tooltipEl = document.createElement("div");
    tooltipEl.className = "chartjs-tooltip";
    tooltipEl.innerHTML = "<table></table>";

    document.querySelectorAll(".parentContainer").forEach((el) => {
      if (el.contains(document.querySelector(".chartjs-tooltip"))) {
        document.querySelector(".chartjs-tooltip").remove();
      }
    });

    this._chart.canvas.closest(".parentContainer").appendChild(tooltipEl);
  }

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set caret Position
  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltip.yAlign) {
    tooltipEl.classList.add(tooltip.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  function getBody(bodyItem) {
    return bodyItem.lines;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(getBody);

    let innerHtml = "<thead>";

    titleLines.forEach(function (title) {
      innerHtml += `<div class='tooltip-title'>${title}</div>`;
    });
    innerHtml += "</thead><tbody>";

    bodyLines.forEach(function (body, i) {
      const colors = tooltip.labelColors[i];
      let style = `background:${colors.backgroundColor}`;
      style += `; border-color:${colors.borderColor}`;
      style += "; border-width: 2px";
      style += "; border-radius: 30px";
      const span = `<span class="chartjs-tooltip-key" style="${style}"></span>`;
      innerHtml += `<tr><td>${span}${body}</td></tr>`;
    });

    innerHtml += "</tbody>";

    const tableRoot = tooltipEl.querySelector("table");
    tableRoot.innerHTML = innerHtml;
  }
  const toolTip = document.querySelector('.chartjs-tooltip');
  const positionY = this._chart.canvas.offsetTop;
  const positionX = this._chart.canvas.offsetLeft;
  const toolTipHeight = toolTip.clientHeight;
  const rtl = document.querySelector('html[dir="rtl"]');

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = `${positionX + tooltip.caretX - (rtl !== null ? toolTip.clientWidth : 0)}px`;
  tooltipEl.style.top = `${positionY + tooltip.caretY-(tooltip.caretY > 10 ? (toolTipHeight > 100 ? toolTipHeight + 5 : toolTipHeight + 15) : 70)}px`;
  tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
  tooltipEl.style.fontSize = `${tooltip.bodyFontSize}px`;
  tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
  tooltipEl.style.padding = `${tooltip.yPadding}px ${tooltip.xPadding}px`;
};

/* line chart without infos */
/* eslint-disable */
function chartjsLineChartOne(
  selector,
  label = "Data",
  bgColor = "#20C99710",
  bColor = "#20C997",
  data = [5, 10, 20, 25, 20, 30, 15, 25, 15, 10]
) {
  var ctx = document.querySelectorAll(selector);
  if (ctx) {
    ctx.forEach(function (elm, id) {
      elm.getContext("2d");
      elm.height = 115;
      var chart = new Chart(elm, {
        type: "line",
        data: {
          labels: ["0", "4", "8", "12", "16", "20", "24"],
          datasets: [{
            label: label,
            backgroundColor: bgColor,
            borderColor: bColor,
            data: data,
            borderWidth: 3,
            fill: true,
            pointHoverRadius: 0,
          }, ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          hover: {
            mode: "nearest",
            intersect: false,
          },
          tooltips: {
            mode: "nearest",
            intersect: false,
            enabled: false,
            custom: customTooltips,
            callbacks: {
              labelColor(tooltipItem, chart) {
                return {
                  backgroundColor: bColor,
                  borderColor: "transparent",
                };
              },
            },
          },
          layout: {
            padding: {
              left: "-10",
              right: 0,
              top: 3,
              bottom: "-10",
            },
          },
          legend: {
            display: false,
            labels: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            yAxes: [{
              stacked: true,
              gridLines: {
                display: false,
                color: "#e5e9f2",
              },
              ticks: {
                beginAtZero: true,
                fontSize: 10,
                display: false,
                stepSize: 20,
              },
            }, ],
            xAxes: [{
              stacked: true,
              gridLines: {
                display: false,
              },

              ticks: {
                beginAtZero: true,
                fontSize: 11,
                display: false,
              },
            }, ],
          },
        },
      });
    });
  }
}

// Facebook Overview Tab
$('#f_week-tab').on("shown.bs.tab", function () {
  fOverviewWeek();
  $('#f_week-tab').off();
});

$('#f_month-tab').on("shown.bs.tab", function () {
  fOverviewMonth();
  $('#f_month-tab').off();
});

$('#f_year-tab').on("shown.bs.tab", function () {
  fOverviewYear();
  $('#f_year-tab').off();
});

function fOverviewWeek() {
  chartjsLineChartOne(
    "#lineChartFive",
    (label = "label"),
    (bgColor = "#20C99710"),
    (bColor = "#20C997"),
    (data = [1000, 5000, 1500, 10000, 14000, 24000, 20000])
  );
  chartjsLineChartOne(
    "#lineChartSix",
    (label = "Label"),
    (bgColor = "#E34A8710"),
    (bColor = "#FF69A5"),
    (data = [10000, 15000, 10000, 15000, 14000, 24000, 20000])
  );
  chartjsLineChartOne(
    "#lineChartSeven",
    (label = "Label"),
    (bgColor = "#0D79DF10"),
    (bColor = "#5F63F2"),
    (data = [100, 300, 150, 200, 250, 500, 300])
  );
  chartjsLineChartOne(
    "#lineChartEight",
    (label = "Label"),
    (bgColor = "#D4740710"),
    (bColor = "#FA8B0C"),
    (data = [100, 300, 150, 200, 250, 500, 300])
  );
}

function fOverviewMonth() {
  chartjsLineChartOne(
    "#lineChartNine",
    (label = "label"),
    (bgColor = "#20C99710"),
    (bColor = "#20C997"),
    (data = [15000, 50000, 15000, 15000, 40000, 24000, 20000])
  );
  chartjsLineChartOne(
    "#lineChartTen",
    (label = "Label"),
    (bgColor = "#E34A8710"),
    (bColor = "#FF69A5"),
    (data = [20000, 40000, 16000, 15000, 30000, 23000, 25000])
  );
  chartjsLineChartOne(
    "#lineChartEleven",
    (label = "Label"),
    (bgColor = "#0D79DF10"),
    (bColor = "#5F63F2"),
    (data = [5000, 4000, 16000, 10000, 20000, 13000, 10000, 6000])
  );
  chartjsLineChartOne(
    "#lineChartTwelve",
    (label = "Label"),
    (bgColor = "#D4740710"),
    (bColor = "#FA8B0C"),
    (data = [1100, 2300, 1500, 1900, 500, 1400, 800, 500])
  );
}

function fOverviewYear() {
  chartjsLineChartOne(
    "#lineChartThirteen",
    (label = "label"),
    (bgColor = "#20C99710"),
    (bColor = "#20C997"),
    (data = [95000, 19000, 55000, 90000, 240000, 95000, 55000, 19000, 55000, 66000, 90000, 240000])
  );
  chartjsLineChartOne(
    "#lineChartFourteen",
    (label = "Label"),
    (bgColor = "#E34A8710"),
    (bColor = "#FF69A5"),
    (data = [98000, 20000, 55000, 90000, 240000, 95000, 55000, 19000, 55000, 66000, 90000, 240000])
  );
  chartjsLineChartOne(
    "#lineChartFifteen",
    (label = "Label"),
    (bgColor = "#0D79DF10"),
    (bColor = "#5F63F2"),
    (data = [9500, 1900, 5500, 9000, 24000, 9500, 5500, 1900, 5500, 9000, 10000, 24000])
  );
  chartjsLineChartOne(
    "#lineChartSixteen",
    (label = "Label"),
    (bgColor = "#D4740710"),
    (bColor = "#FA8B0C"),
    (data = [5000, 19000, 15000, 19000, 20000, 35000, 20000, 19000, 27000, 10000, 15000, 20000])
  );
}

chartjsLineChartOne(
  "#lineChartOne",
  (label = "label"),
  (bgColor = "#20C99710"),
  (bColor = "#20C997"),
  (data = [150, 100, 200, 250, 200, 300, 150])
);
chartjsLineChartOne(
  "#lineChartTwo",
  (label = "Label"),
  (bgColor = "#E34A8710"),
  (bColor = "#FF69A5"),
  (data = [200, 150, 200, 250, 100, 200, 150])
);
chartjsLineChartOne(
  "#lineChartThree",
  (label = "Label"),
  (bgColor = "#0D79DF10"),
  (bColor = "#5F63F2"),
  (data = [150, 100, 200, 250, 200, 300, 150])
);
chartjsLineChartOne(
  "#lineChartFour",
  (label = "Label"),
  (bgColor = "#D4740710"),
  (bColor = "#FA8B0C"),
  (data = [200, 150, 200, 250, 100, 200, 150])
);


const chartLinearGradient = (canvas, height, color) => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, `${color.start}`);
  gradient.addColorStop(1, `${color.end}`);
  return gradient;
};

function chartjsLineChartForcast(
  selector,
  label = "",
  startGradient = "#5F63F212",
  endGradient = "#5F63F202",
  bColor = "#20C997",
  data = [30, 10, 20, 25, 20, 30, 15, 25, 15, 10]
) {
  var ctx = document.querySelectorAll(selector);
  if (ctx) {
    ctx.forEach(function (elm, id) {
      elm.getContext("2d");
      elm.height = 100;
      var chart = new Chart(elm, {
        type: "line",
        data: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
          ],
          datasets: [{
            label: label,
            // backgroundColor: bgColor,
            borderColor: bColor,
            pointHoverBackgroundColor: "#5F63F2",
            pointHoverBorderWidth: 0,
            pointHoverBorderColor: "transparent",
            data: data,
            borderWidth: 3,
            fill: true,
            backgroundColor: () =>
              chartLinearGradient(elm, 80, {
                start: startGradient,
                end: endGradient,
              }),
          }, ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            mode: "nearest",
            intersect: false,
            enabled: false,
            custom: customTooltips,
            callbacks: {
              label(t, d) {
                const dstLabel = d.datasets[t.datasetIndex].label;
                const {
                  yLabel
                } = t;
                return `<span class="chart-data">${yLabel}</span>`;
              },
              labelColor(tooltipItem, chart) {
                return {
                  backgroundColor: bColor,
                  borderColor: "transparent",
                };
              },
            },
          },
          layout: {
            padding: {
              left: "-10",
              right: 0,
              top: 2,
              bottom: "-10",
            },
          },
          legend: {
            display: false,
            labels: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            yAxes: [{
              stacked: true,
              gridLines: {
                display: false,
                color: "#e5e9f2",
              },
              ticks: {
                beginAtZero: true,
                fontSize: 10,
                display: false,
              },
            }, ],
            xAxes: [{
              stacked: true,
              gridLines: {
                display: false,
              },

              ticks: {
                beginAtZero: true,
                fontSize: 11,
                display: false,
              },
            }, ],
          },
        },
      });
    });
  }
}

chartjsLineChartForcast(
  "#lineChartforcastOne",
  (label = "Line Chart dataset"),
  (startGradient = "#5F63F212"),
  (endGradient = "#5F63F202"),
  (bColor = "#5F63F2"),
  (data = [30, 10, 20, 25, 20, 30, 15, 25, 15, 10])
);
chartjsLineChartForcast(
  "#lineChartforcastTwo",
  (label = "Line Chart dataset"),
  (startGradient = "#20C99712"),
  (endGradient = "#20C99703"),
  (bColor = "#20C997"),
  (data = [5, 15, 15, 10, 15, 25, 15, 25, 20, 10])
);

/* line chart small */
function chartjsLineChartSmall(
  selector,
  label = "Line Chart dataset",
  bgColor = "#20C99700",
  bColor = "#20C997",
  data = [5, 10, 20, 25, 20, 30]
) {
  var ctx = document.querySelectorAll(selector);
  if (ctx) {
    ctx.forEach(function (elm, id) {
      elm.getContext("2d");
      elm.height = 30;
      elm.width = 120;
      var chart = new Chart(elm, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [{
            label: label,
            backgroundColor: bgColor,
            borderColor: bColor,
            data: data,
            borderWidth: 3,
            fill: true,
          }, ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: "-10",
              right: 0,
              top: 0,
              bottom: "-10",
            },
          },
          legend: {
            display: false,
            labels: {
              display: false,
            },
          },
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            yAxes: [{
              stacked: true,
              gridLines: {
                display: false,
                color: "#e5e9f2",
              },
              ticks: {
                beginAtZero: true,
                fontSize: 10,
                display: false,
              },
            }, ],
            xAxes: [{
              stacked: true,
              gridLines: {
                display: false,
              },

              ticks: {
                beginAtZero: true,
                fontSize: 11,
                display: false,
              },
            }, ],
          },
        },
      });
    });
  }
}
chartjsLineChartSmall("#lineChartSm1");
chartjsLineChartSmall(
  "#lineChartSm2",
  (label = "Line Chart dataset"),
  (bgColor = "#20C99700"),
  (bColor = "#FF69A5"),
  (data = [0, 10, 8, 14, 7, 10])
);
chartjsLineChartSmall(
  "#lineChartSm3",
  (label = "Line Chart dataset"),
  (bgColor = "#20C99700"),
  (bColor = "#5F63F2"),
  (data = [5, 15, 5, 11, 17, 11])
);
chartjsLineChartSmall(
  "#lineChartSm4",
  (label = "Line Chart dataset"),
  (bgColor = "#20C99700"),
  (bColor = "#2C99FF"),
  (data = [4, 16, 9, 24, 8, 16])
);
chartjsLineChartSmall(
  "#lineChartSm5",
  (label = "Line Chart dataset"),
  (bgColor = "#20C99700"),
  (bColor = "#FA8B0C"),
  (data = [0, 10, 8, 14, 7, 10])
);

/* line chart without infos two */
function chartjsLineChartTwo(
  selector,
  cHeight = "100",
  // cWidth = "265",
  data = [0, -10, 18, 5, 17, 0, 1, 2, 11, 30, 15, 30]
) {
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    ctxs.height = cHeight;
    // ctxs.width = cWidth;
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        datasets: [{
          data: data,
          borderColor: "#C6D0DC",
          borderWidth: 2,
          fill: false,
          pointRadius: [0, 0, 0, 0, 0, 0, 0, 0, 0, 6],
          pointBackgroundColor: [
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "transparent",
            "#20C997",
          ],
          pointHoverBackgroundColor: "#20C997",
          pointHoverRadius: 6,
          pointBorderColor: "transparent",
        }, ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        tooltips: {
          mode: "nearest",
          intersect: false,
          enabled: false,
          custom: customTooltips,
          callbacks: {
            labelColor(tooltipItem, chart) {
              return {
                backgroundColor: "#20C997",
                borderColor: "transparent",
              };
            },
          },
        },
        layout: {
          padding: {
            left: "-10",
            right: 6,
            top: 15,
            bottom: "-10",
          },
        },
        legend: {
          display: false,
          labels: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
          line: {
            tension: 0,
          },
        },
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false,
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              display: false,
            },
          }, ],
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },

            ticks: {
              beginAtZero: true,
              fontSize: 11,
              display: false,
            },
          }, ],
        },
      },
    });
  }
}
chartjsLineChartTwo("myChart2");

// Twitter Overview Chart
$('#to_month-tab').on("shown.bs.tab", function () {
  toOverviewMonth();
  $('#to_month-tab').off();
});

$('#to_year-tab').on("shown.bs.tab", function () {
  toOverviewYear();
  $('#to_year-tab').off();
});

function toOverviewMonth() {
  chartjsLineChartTwo("lineChartSharpOneM", 55, (data = [0, 10, 8, 15, 7, 10, 15, 20, 18, 35, 25, 30]));
  chartjsLineChartTwo(
    "lineChartSharpTwoM",
    55,
    (data = [0, 10, 8, 15, 7, 10, 15, 20, 18, 35, 25, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpThreeM",
    55,
    (data = [0, -10, 18, 5, 17, 0, 1, 2, 11, 30, 15, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpFourM",
    55,
    (data = [0, 15, 10, 18, 20, 15, 10, 7, 15, 8, 10, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpFiveM",
    55,
    (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
  );
}

function toOverviewYear() {
  chartjsLineChartTwo("lineChartSharpOneY", 55, (data = [0, 250, 200, 220, 309, 301, 250, 180, 320, 270, 250, 300]));
  chartjsLineChartTwo(
    "lineChartSharpTwoY",
    55,
    (data = [10, 25, 28, 22, 15, 18, 22, 20, 15, 17, 25, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpThreeY",
    55,
    (data = [0, 15, 10, 18, 20, 15, 10, 7, 15, 8, 10, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpFourY",
    55,
    (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpFiveY",
    55,
    (data = [0, 250, 200, 220, 309, 301, 250, 180, 320, 270, 250, 300])
  );
}

chartjsLineChartTwo("lineChartSharpOne", 55);
chartjsLineChartTwo(
  "lineChartSharpTwo",
  55,
  (data = [10, 25, 28, 22, 15, 18, 22, 20, 15, 17, 25, 30])
);
chartjsLineChartTwo(
  "lineChartSharpThree",
  55,
  (data = [0, 15, 10, 18, 20, 15, 10, 7, 15, 8, 10, 30])
);
chartjsLineChartTwo(
  "lineChartSharpFour",
  55,
  (data = [5, 10, 8, 10, 7, 10, 15, 20, 12, 17, 15, 10])
);
chartjsLineChartTwo(
  "lineChartSharpFive",
  55,
  (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
);

// Instagram Overview Chart
$('#io_month-tab').on("shown.bs.tab", function () {
  ioOverviewMonth();
  $('#io_month-tab').off();
});

$('#io_year-tab').on("shown.bs.tab", function () {
  ioOverviewYear();
  $('#io_year-tab').off();
});

function ioOverviewMonth() {
  chartjsLineChartTwo("lineChartSharpSixM", 55, (data = [0, 10, 8, 15, 7, 10, 15, 20, 18, 35, 25, 30]));
  chartjsLineChartTwo(
    "lineChartSharpSevenM",
    55,
    (data = [0, -10, 18, 5, 17, 0, 1, 2, 11, 30, 15, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpEightM",
    55,
    (data = [0, 15, 10, 18, 20, 15, 10, 7, 15, 8, 10, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpNineM",
    55,
    (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpTenM",
    55,
    (data = [0, 10, 8, 15, 7, 10, 15, 20, 18, 35, 25, 30])
  );
}

function ioOverviewYear() {
  chartjsLineChartTwo("lineChartSharpSixY", 55, (data = [0, 250, 200, 220, 309, 301, 250, 180, 320, 270, 250, 300]));
  chartjsLineChartTwo(
    "lineChartSharpSevenY",
    55,
    (data = [0, -10, 18, 5, 17, 0, 1, 2, 11, 30, 15, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpEightY",
    55,
    (data = [0, 250, 200, 220, 309, 301, 250, 180, 320, 270, 250, 300])
  );
  chartjsLineChartTwo(
    "lineChartSharpNineY",
    55,
    (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharpTenY",
    55,
    (data = [0, 250, 200, 220, 309, 301, 250, 180, 320, 270, 250, 300])
  );
}
chartjsLineChartTwo("lineChartSharpSix", 55);
chartjsLineChartTwo(
  "lineChartSharpSeven",
  55,
  (data = [10, 25, 28, 22, 15, 18, 22, 20, 15, 17, 25, 30])
);
chartjsLineChartTwo(
  "lineChartSharpEight",
  55,
  (data = [0, 15, 10, 18, 20, 15, 10, 7, 15, 8, 10, 30])
);
chartjsLineChartTwo(
  "lineChartSharpNine",
  55,
  (data = [5, 10, 8, 10, 7, 10, 15, 20, 12, 17, 15, 10])
);
chartjsLineChartTwo(
  "lineChartSharpTen",
  55,
  (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
);

// Linkedin Overview Chart
$('#lo_month-tab').on("shown.bs.tab", function () {
  loOverviewMonth();
  $('#lo_month-tab').off();
});

$('#lo_year-tab').on("shown.bs.tab", function () {
  loOverviewYear();
  $('#lo_year-tab').off();
});

function loOverviewMonth() {
  chartjsLineChartTwo("lineChartSharp11M", 60, (data = [0, 10, 8, 15, 7, 10, 15, 20, 18, 35, 25, 30]));
  chartjsLineChartTwo(
    "lineChartSharp12M",
    55,
    (data = [0, -10, 18, 5, 17, 0, 1, 2, 11, 30, 15, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharp13M",
    55,
    (data = [0, 15, 10, 18, 20, 15, 10, 7, 15, 8, 10, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharp14M",
    55,
    (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharp15M",
    55,
    (data = [0, 10, 8, 15, 7, 10, 15, 20, 18, 35, 25, 30])
  );
}

function loOverviewYear() {
  chartjsLineChartTwo("lineChartSharp11Y", 60);
  chartjsLineChartTwo(
    "lineChartSharp12Y",
    55,
    (data = [10, 25, 28, 22, 15, 18, 22, 20, 15, 17, 25, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharp13Y",
    55,
    (data = [0, 15, 10, 18, 20, 15, 10, 7, 15, 8, 10, 30])
  );
  chartjsLineChartTwo(
    "lineChartSharp14Y",
    55,
    (data = [5, 10, 8, 10, 7, 10, 15, 20, 12, 17, 15, 10])
  );
  chartjsLineChartTwo(
    "lineChartSharp15Y",
    55,
    (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
  );
}

chartjsLineChartTwo("lineChartSharp11", 60);
chartjsLineChartTwo(
  "lineChartSharp12",
  55,
  (data = [10, 25, 28, 22, 15, 18, 22, 20, 15, 17, 25, 30])
);
chartjsLineChartTwo(
  "lineChartSharp13",
  55,
  (data = [0, 15, 10, 18, 20, 15, 10, 7, 15, 8, 10, 30])
);
chartjsLineChartTwo(
  "lineChartSharp14",
  55,
  (data = [5, 10, 8, 10, 7, 10, 15, 20, 12, 17, 15, 10])
);
chartjsLineChartTwo(
  "lineChartSharp15",
  55,
  (data = [0, 10, 0, 15, 0, 18, 0, 10, 12, 18, 25, 30])
);

/* line chart three */
function chartjsLineChartThree(selector, bcolor = "#FA8B0C") {
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: ["Current", "1-30", "30-60", "60-90", "90"],
        datasets: [{
          data: [7, 10, 8, 13, 7],
          borderColor: bcolor,
          borderWidth: 3,
          fill: false,
        }, ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
          labels: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              max: 14,
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: true,
              fontSize: 11,
            },
          }, ],
        },
      },
    });
  }
}
chartjsLineChartThree("myChart5");

/* line chart four */
function chartjsLineChartFour(selector, bcolor = "#FA8B0C", height = "95", dataCur, dataPrev, labels) {
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    ctxs.height = window.innerWidth <= 575 ? 190 : height;
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
            data: dataCur,
            borderColor: "#5F63F2",
            borderWidth: 4,
            fill: true,
            backgroundColor: () =>
              chartLinearGradient(ctxs, 300, {
                start: "#5F63F230",
                end: "#ffffff05",
              }),
            label: "Current period",
            pointStyle: "circle",
            pointRadius: "0",
            hoverRadius: "9",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#5F63F2",
            hoverBorderWidth: 5,
          },
          {
            data: dataPrev,
            borderColor: "#C6D0DC",
            borderWidth: 2,
            fill: false,
            backgroundColor: "#00173750",
            label: "Previous period",
            borderDash: [3, 3],
            pointRadius: "0",
            hoverRadius: "0",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        tooltips: {
          mode: "label",
          intersect: false,
          backgroundColor: "#ffffff",
          position: "average",
          enabled: false,
          custom: customTooltips,
          callbacks: {
            label(t, d) {
              const {
                yLabel,
                datasetIndex
              } = t;
              return `<span class="chart-data">${yLabel}k</span> <span class="data-label">${d.datasets[datasetIndex].label}</span>`;
            },
          },
        },
        scales: {
          yAxes: [{
            stacked: false,
            gridLines: {
              display: true,
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: false,
              fontSize: 14,
              display: true,
              suggestedMin: 50,
              suggestedMax: 80,
              stepSize: 20,
              callback: function (label, index, labels) {
                return label + "k";
              },
            },
          }, ],
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: false,
              fontSize: 11,
              display: true,
            },
          }, ],
        },
      },
    });
  }
}

/* line chart four */
function chartjsLineChartFourExtra(selector, bcolor = "#FA8B0C", height = "95", dataCur, dataPrev, labels) {
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    Chart.defaults.global.defaultFontColor = "#868EAE";
    ctxs.height = window.innerWidth <= 575 ? 190 : height;
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: labels,
        datasets: [{
            data: dataCur,
            borderColor: "#5f63f2",
            borderWidth: 4,
            fill: true,
            backgroundColor: () =>
              chartLinearGradient(ctxs, 400, {
                start: "#5f63f21a",
                end: "#ffffff05",
              }),
            label: "Current period",
            pointStyle: "circle",
            pointRadius: "0",
            hoverRadius: "9",
            pointBorderColor: "#fff",
            pointBackgroundColor: "#5f63f2",
            hoverBorderWidth: 5,
          },
          {
            data: dataPrev,
            borderColor: "#C6D0DC",
            borderWidth: 2,
            fill: false,
            backgroundColor: "#00173750",
            label: "Previous period",
            borderDash: [6, 8],
            pointRadius: "0",
            hoverRadius: "0",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 100,
            display: true,
            usePointStyle: true,
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        tooltips: {
          mode: "label",
          intersect: false,
          backgroundColor: "#ffffff",
          position: "average",
          enabled: false,
          custom: customTooltips,
          callbacks: {
            label(t, d) {
              const {
                yLabel,
                datasetIndex
              } = t;
              return `<span class="chart-data">${yLabel}k</span> <span class="data-label">${d.datasets[datasetIndex].label}</span>`;
            },
          },
        },
        scales: {
          yAxes: [{
            stacked: false,
            gridLines: {
              display: true,
              color: "#E3E6EF",
              drawBorder: false,
              tickMarkLength: 0,
              borderDash: [4, 4],
            },
            ticks: {
              beginAtZero: false,
              fontSize: 13,
              display: true,
              suggestedMin: 50,
              suggestedMax: 80,
              stepSize: 20,
              min: 0,
              padding: 15,
              callback: function (label, index, labels) {
                return label + "k";
              },
            },
          }, ],
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: false,
              fontSize: 13,
              display: true,
            },
          }, ],
        },
      },
    });
  }
}

// Total Revenue Chart
chartjsLineChartFourExtra(
  "myChart6TExtra",
  "#FA8B0C",
  "95",
  (data = [20, 38, 30, 45, 40, 50, 25, 70, 35, 40, 26, 58]),
  (data = [38, 55, 42, 36, 60, 65, 50, 30, 25, 40, 45, 25]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
);
$('#tl_revenue-week-tab').on("shown.bs.tab", function () {
  chartjsLineChartFourExtra(
    "myChart6WExtra",
    "#FA8B0C",
    "95",
    (data = [20, 25, 25, 30, 35, 30, 25, 25, 20, 25, 30, 25]),
    (data = [40, 40, 30, 35, 20, 25, 40, 35, 30, 40, 40, 35]),
    labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  );
  $('#tl_revenue-week-tab').off();
});
$('#tl_revenue-month-tab').on("shown.bs.tab", function () {
  chartjsLineChartFourExtra(
    "myChart6MExtra",
    "#FA8B0C",
    "95",
    (data = [55, 25, 45, 42, 40, 45, 42, 45, 35, 55, 40, 30]),
    (data = [45, 30, 35, 32, 35, 50, 32, 35, 25, 40, 30, 25]),
    labels = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"]
  );
  $('#tl_revenue-month-tab').off();
});

chartjsLineChartFourExtra(
  "myChart6Extra",
  "#FA8B0C",
  "95",
  (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
  (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
);
$('#tl_revenue-week-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "myChart6W",
    "#FA8B0C",
    "95",
    (data = [20, 25, 25, 30, 35, 30, 25, 25, 20, 25, 30, 25]),
    (data = [40, 40, 30, 35, 20, 25, 40, 35, 30, 40, 40, 35]),
    labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  );
  $('#tl_revenue-week-tab').off();
});
$('#tl_revenue-month-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "myChart6M",
    "#FA8B0C",
    "95",
    (data = [55, 25, 45, 42, 40, 45, 42, 45, 35, 55, 40, 30]),
    (data = [45, 30, 35, 32, 35, 50, 32, 35, 25, 40, 30, 25]),
    labels = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"]
  );
  $('#tl_revenue-month-tab').off();
});

chartjsLineChartFour(
  "myChart6",
  "#FA8B0C",
  "95",
  (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
  (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
);

// Wp Charts Tab
$('#w_perfomence-week-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_R_W",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
    labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  );
  $('#w_perfomence-week-tab').off();
});
$('#w_perfomence-month-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_R_M",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
    labels = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"]
  );
  $('#w_perfomence-month-tab').off();
});

chartjsLineChartFour(
  "wpChart_R_Y",
  "#FA8B0C",
  "85",
  (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
  (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
);

$('#w_ps_user-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_U_W",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
    labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  );
  $('#w_ps_user-tab').off();
});
$('#m_ps_user-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_U_M",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
    labels = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"]
  );
  $('#m_ps_user-tab').off();
});
$('#y_ps_user-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_U_Y",
    "#FA8B0C",
    "85",
    (data = [65, 40, 35, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 15, 20, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
    labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  );
  $('#y_ps_user-tab').off();
});

$('#w_ps_sDuration-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_Sd_W",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 20, 45, 35, 55, 50, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 20, 40]),
    labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  );
  $('#w_ps_sDuration-tab').off();
});
$('#m_ps_sDuration-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_Sd_M",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 20, 60, 42, 15, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 50, 30]),
    labels = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"]
  );
  $('#m_ps_sDuration-tab').off();
});
$('#y_ps_sDuration-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_Sd_Y",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 22, 45, 35, 65, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 42, 35, 25, 40, 15, 25]),
    labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  );
  $('#y_ps_sDuration-tab').off();
});

$('#w_ps_session-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_S_W",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
    labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  );
  $('#w_ps_session-tab').off();
});
$('#m_ps_session-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_S_M",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
    labels = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"]
  );
  $('#m_ps_session-tab').off();
});
$('#y_ps_session-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_S_Y",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
    labels = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ]
  );
  $('#y_ps_session-tab').off();
});

$('#ps_user-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_U",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55])
  );
  $('#ps_user-tab').off();
});

$('#ps_sDuration-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_Sd",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55])
  );
  $('#ps_sDuration-tab').off();
});

$('#ps_session-tab').on("shown.bs.tab", function () {
  chartjsLineChartFour(
    "wpChart_S",
    "#FA8B0C",
    "85",
    (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
    (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55])
  );
  $('#ps_session-tab').off();
});

chartjsLineChartFour(
  "wpChart",
  "#FA8B0C",
  "85",
  (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
  (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
);

chartjsLineChartFour(
  "profile-chart",
  (bcolor = "#FA8B0C"),
  (height = "250"),
  (data = [65, 35, 45, 42, 65, 60, 42, 45, 35, 55, 40, 65]),
  (data = [45, 20, 35, 32, 50, 45, 32, 35, 25, 40, 30, 55]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ]
);

function chartjsLineChartBasic(selector, bcolor = "#FA8B0C") {
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    ctxs.height = 200;
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
          data: [45, 25, 60, 38, 70, 60, 38, 40, 25, 50, 45, 75],
          borderColor: "#5F63F2",
          borderWidth: 3,
          fill: false,
          backgroundColor: "#5F63F210",
          label: "Current period",
          pointStyle: "circle",
          pointRadius: "0",
          hoverRadius: "6",
          pointBorderColor: "#fff",
          pointBackgroundColor: "#5F63F2",
          hoverBorderWidth: 3,
        }, ],
      },
      options: {
        maintainAspectRatio: true,
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        scales: {
          yAxes: [{
            stacked: false,
            gridLines: {
              display: true,
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: false,
              fontSize: 14,
              display: true,
              suggestedMin: 50,
              suggestedMax: 80,
              stepSize: 20,
              callback: function (label, index, labels) {
                return label + "k";
              },
            },
          }, ],
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              beginAtZero: false,
              fontSize: 11,
              display: true,
            },
          }, ],
        },
      },
    });
  }
}
chartjsLineChartBasic("lineChartBasic");

function chartjsLineChartAccount(selector, bcolor = "#FA8B0C") {
  var ctxs = document.getElementById(selector);
  if (ctxs) {
    ctxs.getContext("2d");
    ctxs.height = window.innerWidth <= 575 ? 200 : 100;
    var charts = new Chart(ctxs, {
      type: "line",
      data: {
        labels: ["Current", "1-30", "30-60", "60-90", "90"],
        datasets: [{
          data: [105, 145, 95, 149, 90],
          borderColor: bcolor,
          borderWidth: 3,
          fill: false,
          pointBackgroundColor: bcolor,
          pointBorderColor: "#fff",
          pointHoverBorderColor: "#fff",
          pointBorderWidth: 2,
          pointHoverBorderWidth: 3,
          pointHoverRadius: 5,
          z: 5,
        }, ],
      },
      options: {
        maintainAspectRatio: true,
        elements: {
          point: {
            radius: 5,
            z: 5,
          },
        },
        legend: {
          display: false,
          position: "bottom",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        tooltips: {
          mode: "label",
          intersect: false,
          backgroundColor: "#ffffff",
          position: "average",
          titleFontColor: "#5A5F7D",
          titleFontSize: 13,
          titleSpacing: 15,
          bodyFontColor: "#868EAE",
          bodyFontSize: 12,
          borderColor: "#F1F2F6",
          borderWidth: 2,
          bodySpacing: 15,
          xPadding: 15,
          yPadding: 15,
          z: 999999,
          custom(tooltip) {
            if (!tooltip) return;
            // disable displaying the color box;
            tooltip.displayColors = false;
          },
          callbacks: {
            title() {
              return `Account Receivable`;
            },
            label(t, d) {
              const {
                yLabel,
                xLabel
              } = t;
              return `${xLabel}: $${yLabel}k`;
            },
            labelColor(tooltipItem, chart) {
              return {
                backgroundColor: "#000",
                borderColor: "transparent",
              };
            },
          },
        },
        hover: {
          mode: "index",
          intersect: false,
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
              borderDash: [3, 3],
              zeroLineColor: "#e5e9f2",
              zeroLineWidth: 1,
              zeroLineBorderDash: [3, 3],
            },
            ticks: {
              beginAtZero: true,
              fontSize: 13,
              fontColor: "#182b49",
              max: 200,
              stepSize: 50,
              padding: 10,
              callback(label) {
                return `${label}k`;
              },
            },
          }, ],
          xAxes: [{
            stacked: true,
            barPercentage: 1,
            gridLines: {
              display: true,
              zeroLineWidth: 2,
              zeroLineColor: "transparent",
              color: "transparent",
              z: 1,
            },
            ticks: {
              display: true,
            },
          }, ],
        },
      },
    });
  }
}
chartjsLineChartAccount("lineChartAccountReceive");
chartjsLineChartAccount("lineChartAccountPayable", (bcolor = "#2C99FF"));

/* Bar chart */
function salesLineChartTwo(selector, dataG, dataL, labels, label = "Bar chart one") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 165;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
            data: dataG,
            backgroundColor: "#5F63F280",
            hoverBackgroundColor: "#5F63F2",
            label: "Gained",
          },
          // {
          //   data: dataL,
          //   backgroundColor: "#FF4D4F80",
          //   hoverBackgroundColor: "#FF4D4F",
          //   label: "Lost",
          // },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        tooltips: {
          mode: "label",
          // intersect: false,
          // enabled: false,
          // // custom: customTooltips,
          callbacks: {
            labelColor(tooltipItem, chart) {
              return {
                backgroundColor: "#5F63F2",
                borderColor: "transparent",
              };
            },
          },
        },
        legend: {
          display: false,
          position: "top",
          align: "end",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
              drawBorder: false,
              display: false,
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#868EAE",
              max: 80,
              stepSize: 20,
              display: false,
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: false,
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "#868EAE",
            },
          }, ],
        },
      },
    });
  }
}

salesLineChartTwo(
  "salesLineChart",
  dataG = (data = [45, 65, 38, 100, 50, 65, 45, 65, 100, 50, 65, 45]),
    dataL = (data = [0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0]),
    labels = ["Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
);




function chartjsBarChartOne(selector, dataG, dataL, labels, label = "Bar chart one") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 175;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
            data: dataG,
            backgroundColor: "#5F63F280",
            hoverBackgroundColor: "#5F63F2",
            label: "Gained",
          },
          {
            data: dataL,
            backgroundColor: "#FF4D4F80",
            hoverBackgroundColor: "#FF4D4F",
            label: "Lost",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        tooltips: {
          mode: "label",
          intersect: false,
          enabled: false,
          custom: customTooltips,
          callbacks: {
            labelColor(tooltipItem, chart) {
              return {
                backgroundColor: "#5F63F2",
                borderColor: "transparent",
              };
            },
          },
        },
        legend: {
          display: false,
          position: "top",
          align: "end",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#182b49",
              max: 80,
              stepSize: 20,
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: false,
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "#182b49",
            },
          }, ],
        },
      },
    });
  }
}

chartjsBarChartOne(
  "ys_barChartOne",
  dataG = (data = [10, 50, 15, 70, 14, 24, 20]),
  dataL = (data = [70, 35, 10, 25, 10, 14, 15]),
  labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
);

$('#ys_month-tab').on("shown.bs.tab", function () {
  ySubscriberMonth();
  $('#ys_month-tab').off();
});

$('#ys_year-tab').on("shown.bs.tab", function () {
  ySubscriberYear();
  $('#ys_year-tab').off();
});

function ySubscriberMonth() {
  chartjsBarChartOne(
    "ys_barChartTwo",
    dataG = (data = [20, 30, 15, 60, 70, 24]),
    dataL = (data = [70, 60, 40, 20, 15, 65]),
    labels = ["1-5", "6-10", "11-15", "15-20", "21-25", "25-30"]
  );
}

function ySubscriberYear() {
  chartjsBarChartOne(
    "ys_barChartThree",
    dataG = (data = [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]),
    dataL = (data = [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]),
    labels = ["Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ]
  );
}

function chartjsBarChartTransparent(selector, dataCIn, DataCOut, label = "Bar chart Transparent") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 200;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "rgba(0,23,55, .5)",
            label: "Profit",
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "rgba(28,225,172, .5)",
            label: "Lose",
          },
        ],
      },

      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: true,
          position: "bottom",
          align: "start",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 13,
              fontColor: "#182b49",
              max: 80,
              stepSize: 20,
              callback(value, index, values) {
                return `${value}k`;
              },
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: false,
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontSize: 13,
              fontColor: "#182b49",
            },
          }, ],
        },
      },
    });
  }
}
chartjsBarChartTransparent("barChartTransparent");


function chartjsBarChartCashflowExtra(selector, dataCIn, DataCOut, labels, label = "Bar chart Cash Flow") {
  var ctx = document.getElementById(selector);
  Chart.defaults.global.defaultFontColor = "#868EAE";
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = window.innerWidth <= 575 ? 206 : 106;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
            data: dataCIn,
            backgroundColor: "#20C99770",
            hoverBackgroundColor: "#20C997",
            label: "Won",
          },
          {
            data: DataCOut,
            backgroundColor: "#5f63f280",
            hoverBackgroundColor: "#5F63F2",
            label: "Amount",
          },
        ],
      },

      options: {
        maintainAspectRatio: true,
        responsive: true,
        tooltips: {
          mode: "label",
          intersect: false,
          enabled: false,
          custom: customTooltips,
          callbacks: {
            label(t, d) {
              const dstLabel = d.datasets[t.datasetIndex].label;
              const {
                yLabel
              } = t;
              return `<span class="chart-data">${yLabel}</span> <span class="data-label">${dstLabel}</span>`;
            },
            labelColor(tooltipItem, chart) {
              return {
                backgroundColor: "#20C997",
                borderColor: "transparent",
              };
            },
          },
        },
        legend: {
          display: false,
          position: "bottom",
          align: "start",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
              borderDash: [3, 3],
              zeroLineColor: "#e5e9f2",
              zeroLineWidth: 1,
              zeroLineBorderDash: [3, 3],
            },
            ticks: {
              beginAtZero: true,
              fontSize: 12,
              fontColor: "#868EAE",
              max: 80,
              stepSize: 20,
              beginAtZero: true,
              padding: 15,
              callback(value, index, values) {
                return `${value}k`;
              },
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: true,
              zeroLineWidth: 2,
              zeroLineColor: "#fff",
              color: "transparent",
              z: 1,
            },
            barPercentage: 0.65,
            ticks: {
              beginAtZero: true,
              fontSize: 12,
              fontColor: "#182b49",
              padding: 9,
            },
          }, ],
        },
      },
    });
  }
}

$('#t_revenue-week-tab').on("shown.bs.tab", function () {
  chartjsBarChartCashflowExtra(
    "barChartCashflowExtra",
    (data = [93, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]),
    (data = [31, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]),
    labels = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ]
  );
  $('#t_revenue-week-tab').off();
});

$('#t_revenue-month-tab').on("shown.bs.tab", function () {
  chartjsBarChartCashflowExtra(
    "barChartCashflow_Mextra",
    (data = [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]),
    (data = [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]),
    labels = [
      "1-5",
      "6-10",
      "11-15",
      "16-20",
      "21-25",
      "26-30",
    ]
  );
  $('#t_revenue-month-tab').off();
});

chartjsBarChartCashflowExtra(
  "barChartCashflow_Wextra",
  (data = [35, 55, 25, 72, 45, 58, 35, 45, 65, 38, 45, 48]),
  (data = [15, 35, 10, 16, 25, 44, 10, 5, 24, 18, 7, 36]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
);




function chartjsBarChartCashflow(selector, dataCIn, DataCOut, labels, label = "Bar chart Cash Flow") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = window.innerWidth <= 575 ? 206 : 106;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
            data: dataCIn,
            backgroundColor: "#20C99770",
            hoverBackgroundColor: "#20C997",
            label: "Cash in",
          },
          {
            data: DataCOut,
            backgroundColor: "#FF4D4F70",
            hoverBackgroundColor: "#FF4D4F",
            label: "Cash out",
          },
        ],
      },

      options: {
        maintainAspectRatio: true,
        responsive: true,
        tooltips: {
          mode: "label",
          intersect: false,
          enabled: false,
          custom: customTooltips,
          callbacks: {
            label(t, d) {
              const dstLabel = d.datasets[t.datasetIndex].label;
              const {
                yLabel
              } = t;
              return `<span class="chart-data">${yLabel}</span> <span class="data-label">${dstLabel}</span>`;
            },
            labelColor(tooltipItem, chart) {
              return {
                backgroundColor: "#20C997",
                borderColor: "transparent",
              };
            },
          },
        },
        legend: {
          display: false,
          position: "bottom",
          align: "start",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
              borderDash: [3, 3],
              zeroLineColor: "#e5e9f2",
              zeroLineWidth: 1,
              zeroLineBorderDash: [3, 3],
            },
            ticks: {
              beginAtZero: true,
              fontSize: 12,
              fontColor: "#182b49",
              max: 80,
              stepSize: 20,
              callback(value, index, values) {
                return `${value}k`;
              },
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: true,
              zeroLineWidth: 2,
              zeroLineColor: "#fff",
              color: "transparent",
              z: 1,
            },
            barPercentage: 0.65,
            ticks: {
              beginAtZero: true,
              fontSize: 12,
              fontColor: "#182b49",
            },
          }, ],
        },
      },
    });
  }
}


$('#t_revenue-week-tab').on("shown.bs.tab", function () {
  chartjsBarChartCashflow(
    "barChartCashflow_W",
    (data = [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]),
    (data = [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]),
    labels = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ]
  );
  $('#t_revenue-week-tab').off();
});

$('#t_revenue-month-tab').on("shown.bs.tab", function () {
  chartjsBarChartCashflow(
    "barChartCashflow_M",
    (data = [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]),
    (data = [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]),
    labels = [
      "1-5",
      "6-10",
      "11-15",
      "16-20",
      "21-25",
      "26-30",
    ]
  );
  $('#t_revenue-month-tab').off();
});

chartjsBarChartCashflow(
  "barChartCashflow",
  (data = [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]),
  (data = [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
);

function chartjsBarChartInEx(selector, data1, data2, data3, data4, labels, label = "Bar chart Income Expense") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = window.innerWidth <= 575 ? 180 : 84;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
            data: data1,
            backgroundColor: "#5F63F250",
            hoverBackgroundColor: "#5F63F2",
            label: "Total Income",
          },
          {
            data: data2,
            backgroundColor: "#FF69A550",
            hoverBackgroundColor: "#FF69A5",
            label: "Cost of goods sold",
          },
          {
            data: data3,
            backgroundColor: "#FA8B0C50",
            hoverBackgroundColor: "#FA8B0C",
            label: "Total expenses",
          },
          {
            data: data4,
            backgroundColor: "#20C99750",
            hoverBackgroundColor: "#20C997",
            label: "Net profit",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        tooltips: {
          mode: "label",
          intersect: false,
          enabled: false,
          custom: customTooltips,
          callbacks: {
            label(t, d) {
              const dstLabel = d.datasets[t.datasetIndex].label;
              const {
                yLabel
              } = t;
              return `<span class="chart-data">${yLabel}</span> <span class="data-label">${dstLabel}</span>`;
            },
            labelColor(tooltipItem, chart) {
              return {
                backgroundColor: "#5F63F2",
                borderColor: "transparent",
              };
            },
          },
        },
        legend: {
          display: false,
          position: "bottom",
          align: "start",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
              borderDash: [3, 3],
              zeroLineColor: "#e5e9f2",
              zeroLineWidth: 1,
              zeroLineBorderDash: [3, 3],
            },
            ticks: {
              beginAtZero: true,
              fontSize: 13,
              fontColor: "#182b49",
              max: 80,
              stepSize: 20,
              callback(value, index, values) {
                return `${value}k`;
              },
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: false,
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontSize: 13,
              fontColor: "#182b49",
            },
          }, ],
        },
      },
    });
  }
}

$('#incExp-week-tab').on("shown.bs.tab", function () {
  chartjsBarChartInEx(
    "barChartInEx_W",
    (data = [20, 45, 50, 60, 70, 40, 45]),
    (data = [10, 40, 60, 55, 45, 35, 30]),
    (data = [20, 45, 50, 60, 70, 40, 45]),
    (data = [10, 40, 60, 55, 45, 35, 30]),
    labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  );
  $('#incExp-week-tab').off();
});
$('#incExp-month-tab').on("shown.bs.tab", function () {
  chartjsBarChartInEx(
    "barChartInEx_M",
    (data = [20, 50, 60, 70, 40, 30]),
    (data = [10, 60, 55, 45, 35, 40]),
    (data = [20, 50, 60, 70, 40, 50]),
    (data = [10, 60, 55, 45, 35, 20]),
    labels = ["1-5", "6-10", "11-15", "16-20", "21-25", "26-30"]
  );
  $('#incExp-month-tab').off();
});

chartjsBarChartInEx(
  "barChartInEx",
  (data = [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]),
  (data = [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]),
  (data = [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30]),
  (data = [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20]),
  labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]
);

/* Bar chart two */
function chartjsBarChartTwo(selector, label = "Bar chart one") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "rgba(0,23,55, .5)",
            label: "Profit",
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "rgba(28,225,172, .5)",
            label: "Lose",
          },
          {
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "rgba(0,23,55, .5)",
            label: "Profit",
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "rgba(28,225,172, .5)",
            label: "Lose",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#182b49",
              max: 80,
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: false,
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "#182b49",
            },
          }, ],
        },
      },
    });
  }
}
chartjsBarChartTwo("myChart4");

/* Bar chart three */
function chartJsBarChartThree(
  selector,
  bgColor = "#5F63F210",
  hBgColor = "#5F63F2",
  label = "chart label"
) {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 94;
    ctx.width = 130;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [{
          label: label,
          data: [20, 60, 50, 45, 50, 60, 70],
          backgroundColor: bgColor,
          hoverBackgroundColor: hBgColor,
        }, ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          labels: {
            display: false,
          },
        },
        tooltips: {
          mode: "label",
          intersect: false,
          position: "average",
          enabled: false,
          custom: customTooltips,
          callbacks: {
            label(t, d) {
              const dstLabel = d.datasets[t.datasetIndex].label;
              const {
                yLabel
              } = t;
              return `<span class="chart-data">${yLabel}</span> <span class="data-label">${dstLabel}</span>`;
            },
            labelColor(tooltipItem, chart) {
              const dataset =
                chart.config.data.datasets[tooltipItem.datasetIndex];
              return {
                backgroundColor: dataset.hoverBackgroundColor,
                borderColor: "transparent",
                usePointStyle: true,
              };
            },
          },
        },
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }, ],
          xAxes: [{
            stacked: true,
            barPercentage: 1,
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }, ],
        },
      },
    });
  }
}

/* Bar chart three */
function chartJsBarChartFour(
  selector,
  bgColor = "#5F63F210",
  hBgColor = "#5F63F2",
  label = "chart label"
) {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 94;
    ctx.width = 130;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [{
          label: label,
          data: [45, 35, 50, 20, 70, 40, 15],
          backgroundColor: bgColor,
          hoverBackgroundColor: hBgColor,
        }, ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          labels: {
            display: false,
          },
        },
        tooltips: {
          mode: "label",
          intersect: false,
          position: "average",
          enabled: false,
          custom: customTooltips,
          callbacks: {
            label(t, d) {
              const dstLabel = d.datasets[t.datasetIndex].label;
              const {
                yLabel
              } = t;
              return `<span class="chart-data">${yLabel}</span> <span class="data-label">${dstLabel}</span>`;
            },
            labelColor(tooltipItem, chart) {
              const dataset =
                chart.config.data.datasets[tooltipItem.datasetIndex];
              return {
                backgroundColor: dataset.hoverBackgroundColor,
                borderColor: "transparent",
                usePointStyle: true,
              };
            },
          },
        },
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }, ],
          xAxes: [{
            stacked: true,
            barPercentage: 1,
            gridLines: {
              display: false,
            },
            ticks: {
              display: false,
            },
          }, ],
        },
      },
    });
  }
}

function chartjsBarChartHorizontal(selector, label = "Bar chart horizontal") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 200;
    var chart = new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "#5F63F280",
            hoverBackgroundColor: "#5F63F2",
            label: "Profit",
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "#FF4D4F80",
            hoverBackgroundColor: "#FF4D4F",
            label: "Lose",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          position: "top",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#182b49",
              max: 80,
              stepSize: 20,
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: false,
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "#182b49",
            },
          }, ],
        },
      },
    });
  }
}

function chartjsBarChartVertical(selector, label = "Bar chart vertical") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 200;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "#5F63F280",
            hoverBackgroundColor: "#5F63F2",
            label: "Profit",
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "#FF4D4F80",
            hoverBackgroundColor: "#FF4D4F",
            label: "Lose",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          position: "top",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#182b49",
              max: 80,
              stepSize: 20,
            },
          }, ],
          xAxes: [{
            gridLines: {
              display: false,
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "#182b49",
            },
          }, ],
        },
      },
    });
  }
}

function chartjsBarChartStacked(selector, label = "Bar chart stacked") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 200;
    var chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            backgroundColor: "#5F63F280",
            hoverBackgroundColor: "#5F63F2",
            label: "Profit",
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            backgroundColor: "#FF4D4F80",
            hoverBackgroundColor: "#FF4D4F",
            label: "Lose",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          position: "top",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        layout: {
          padding: {
            left: "0",
            right: 0,
            top: 0,
            bottom: "0",
          },
        },
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              fontColor: "#182b49",
              max: 80,
              stepSize: 20,
            },
          }, ],
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },
            barPercentage: 0.6,
            ticks: {
              beginAtZero: true,
              fontSize: 11,
              fontColor: "#182b49",
            },
          }, ],
        },
      },
    });
  }
}

chartjsBarChartHorizontal("barChartHorizontal");
chartjsBarChartVertical("barChartVertical");
chartjsBarChartStacked("barChartstacked");
chartJsBarChartThree("mychart8", "#5F63F220", "#5F63F2", "Order");
chartJsBarChartThree("mychart9", "#FF69A520", "#FF69A5", "Revenue");
chartJsBarChartThree("mychart10", "#20C99720", "#20C997", "Avg. Order");
chartJsBarChartThree("mychart11", "#2C99FF20", "#2C99FF", "Visitors");


chartJsBarChartFour("mychart12", "#FF69A520", "#FF69A5", "New Contact");
chartJsBarChartFour("mychart13", "#5F63F220", "#5F63F2", "New Deals");
chartJsBarChartFour("mychart14", "#20C99720", "#20C997", "New Leads");
chartJsBarChartFour("mychart15", "#2C99FF20", "#2C99FF", "Revenue");
// Area Chart
function chartjsAreaChartBasic(selector, label = "Bar chart Basic") {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = 200;
    var chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
        ],
        datasets: [{
            data: [20, 60, 50, 45, 50, 60, 70, 40, 45, 35, 25, 30],
            borderColor: "#001737",
            borderWidth: 1,
            fill: true,
            backgroundColor: "#00173750",
          },
          {
            data: [10, 40, 30, 40, 60, 55, 45, 35, 30, 20, 15, 20],
            borderColor: "#1ce1ac",
            borderWidth: 1,
            fill: true,
            backgroundColor: "#1ce1ac50",
          },
        ],
      },
      options: {
        maintainAspectRatio: true,
        layout: {
          padding: {
            left: "-10",
            right: 0,
            top: 2,
            bottom: "-10",
          },
        },
        legend: {
          display: false,
          labels: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          yAxes: [{
            stacked: true,
            gridLines: {
              display: false,
              color: "#e5e9f2",
            },
            ticks: {
              beginAtZero: true,
              fontSize: 10,
              display: false,
            },
          }, ],
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false,
            },

            ticks: {
              beginAtZero: true,
              fontSize: 11,
              display: false,
            },
          }, ],
        },
      },
    });
  }
}

chartjsAreaChartBasic("areaChartBasic");

/* Pie chart */
function chartjsPieChartOne(selector) {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    var chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Desktop", "Mobile", "Tablets"],
        datasets: [{
          data: [5870, 4483, 2420],
          backgroundColor: ["#560bd0", "#007bff", "#00cccc"],
        }, ],
      },
      options: {
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: true,
          position: "bottom",
          labels: {
            boxWidth: 6,
            display: true,
            usePointStyle: true,
          },
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  }
}
chartjsPieChartOne("mychart7");

function chartjsDoughnut(selector, cHeight, data) {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = cHeight;
    var chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Desktop", "Mobile", "Tablets"],
        datasets: [{
          data: data,
          backgroundColor: ["#20C997", "#5F63F2", "#FA8B0C"],
          total: "9,283",
        }, ],
      },
      options: {
        cutoutPercentage: 70,
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          position: "bottom",
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  }
}
chartjsDoughnut("chartDoughnut", "88");

chartjsDoughnut(
  "chartDoughnut2",
  "150",
  (data = [4483, 5870, 2420])
);

$('#se_device-today-tab').on("shown.bs.tab", function () {
  chartjsDoughnut(
    "chartDoughnut2T",
    "146",
    (data = [83, 70, 20])
  );
  $('#se_device-today-tab').off();
});

$('#se_device-week-tab').on("shown.bs.tab", function () {
  chartjsDoughnut(
    "chartDoughnut2W",
    "146",
    (data = [483, 870, 420])
  );
  $('#se_device-week-tab').off();
});

$('#se_device-year-tab').on("shown.bs.tab", function () {
  chartjsDoughnut(
    "chartDoughnut2Y",
    "146",
    (data = [9483, 13870, 15420])
  );
  $('#se_device-year-tab').off();
});

chartjsDoughnut("chartDoughnut3", "146", (data = [83, 70, 20]));

$('#rb_device-week-tab').on("shown.bs.tab", function () {
  chartjsDoughnut(
    "chartDoughnut3W",
    "146",
    (data = [483, 870, 420])
  );
  $('#rb_device-week-tab').off();
});
$('#rb_device-month-tab').on("shown.bs.tab", function () {
  chartjsDoughnut("chartDoughnut3M", "146", (data = [4483, 5870, 2420]));
  $('#rb_device-month-tab').off();
});





function chartjsDoughnutExtra(selector, cHeight, data) {
  var ctx = document.getElementById(selector);
  if (ctx) {
    ctx.getContext("2d");
    ctx.height = cHeight;
    var chart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Total Send", "Open", "Not Open"],
        datasets: [{
          data: data,
          backgroundColor: ["#20C997", "#5F63F2", "#FA8B0C"],
          total: "9,283",
        }, ],
      },
      options: {
        cutoutPercentage: 70,
        maintainAspectRatio: true,
        responsive: true,
        legend: {
          display: false,
          position: "bottom",
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    });
  }
}
chartjsDoughnutExtra("chartDoughnut", "88");

chartjsDoughnutExtra(
  "chartDoughnut2Extra",
  "150",
  (data = [4483, 5870, 2420])
);

$('#se_device-today-tab').on("shown.bs.tab", function () {
  chartjsDoughnutExtra(
    "chartDoughnut2TExtra",
    "146",
    (data = [83, 70, 20])
  );
  $('#se_device-today-tab').off();
});

$('#se_device-week-tab').on("shown.bs.tab", function () {
  chartjsDoughnutExtra(
    "chartDoughnut2WExtra",
    "146",
    (data = [483, 870, 420])
  );
  $('#se_device-week-tab').off();
});

$('#se_device-year-tab').on("shown.bs.tab", function () {
  chartjsDoughnutExtra(
    "chartDoughnut2YExtra",
    "146",
    (data = [9483, 13870, 15420])
  );
  $('#se_device-year-tab').off();
});

chartjsDoughnutExtra("chartDoughnut3Extra", "122", (data = [50, 64, 50]));

$('#rb_device-week-tab').on("shown.bs.tab", function () {
  chartjsDoughnutExtra(
    "chartDoughnut3WExtra",
    "146",
    (data = [450, 864, 450])
  );
  $('#rb_device-week-tab').off();
});
$('#rb_device-month-tab').on("shown.bs.tab", function () {
  chartjsDoughnutExtra("chartDoughnut3MExtra", "146", (data = [4450, 5864, 2450]));
  $('#rb_device-month-tab').off();
});