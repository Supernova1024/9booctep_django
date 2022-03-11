
$(function () {
    "use strict";
    const barChart = document.getElementById("google-barChart");
    const materialChart = document.getElementById("google-meterialChart");
    const barChartStacked = document.getElementById("google-barChartStacked");
    const barChartCusttomColor = document.getElementById("google-barChartCustomColor");
    const comboChart = document.getElementById("google-comboChart");
    const lineChart = document.getElementById("google-lineChart");
    const lineChartMultiple = document.getElementById("google-lineChartMultiple");
    const orgChart = document.getElementById("google-orgChart");
    const pieChartBasic = document.getElementById("google-pieChartBasic");
    const pieChart3d = document.getElementById("google-pieChart3d");
    if(barChart && materialChart && barChartStacked && barChartCusttomColor && comboChart && lineChart && lineChartMultiple && orgChart && pieChartBasic && pieChart3d){
        google.charts.load("current", { packages: ["corechart", "bar"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["City", "2010 Population", "2000 Population"],
                    ["New York City, NY", 8175000, 8008000],
                    ["Los Angeles, CA", 3792000, 3694000],
                    ["Chicago, IL", 2695000, 2896000],
                    ["Houston, TX", 2099000, 1953000],
                    ["Philadelphia, PA", 1526000, 1517000]
                ]);
                new google.visualization.BarChart(barChart).draw(a, {
                    title: 'Population of Largest U.S. Cities',
                    chartArea: {width: '50%'},
                    height: 300,
                    hAxis: {
                        title: 'Total Population',
                        minValue: 0
                    },
                    vAxis: {
                        title: 'City'
                    }
                });
            }),
        google.charts.load("current", { packages: [ "bar"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["Year", "Sales", "Expenses", "Profit"],
                    ["2014", 1000, 400, 200],
                    ["2015", 1170, 460, 250],
                    ["2016", 660, 1120, 300],
                    ["2017", 1030, 540, 350]
                ]);
                new google.charts.Bar(materialChart).draw(a, {
                    chart: {
                        title: 'Company Performance',
                        subtitle: 'Sales, Expenses, and Profit: 2014-2017',
                    },
                    chartArea: {width: '50%'},
                    height: 300,
                    bars: 'vertical',
                    hAxis: {
                        title: 'Total Population',
                        minValue: 0
                    },
                    vAxis: {
                        title: 'City'
                    }
                });
            }),
        google.charts.load("current", { packages: ["corechart", "bar"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["City", "2010 Population", "2000 Population"],
                    ["New York City, NY", 8175000, 8008000],
                    ["Los Angeles, CA", 3792000, 3694000],
                    ["Chicago, IL", 2695000, 2896000],
                    ["Houston, TX", 2099000, 1953000],
                    ["Philadelphia, PA", 1526000, 1517000]
                ]);
                new google.visualization.BarChart(barChartStacked).draw(a, {
                    title: 'Population of Largest U.S. Cities',
                    chartArea: {width: '50%'},
                    height: 300,
                    isStacked: true,
                    hAxis: {
                        title: 'Total Population',
                        minValue: 0
                    },
                    vAxis: {
                        title: 'City'
                    }
                });
            }),
        google.charts.load("current", { packages: ["corechart", "bar"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["City", "2010 Population", "2000 Population"],
                    ["New York City, NY", 8175000, 8008000],
                    ["Los Angeles, CA", 3792000, 3694000],
                    ["Chicago, IL", 2695000, 2896000],
                    ["Houston, TX", 2099000, 1953000],
                    ["Philadelphia, PA", 1526000, 1517000]
                ]);
                new google.visualization.BarChart(barChartCusttomColor).draw(a, {
                    title: 'Population of Largest U.S. Cities',
                    chartArea: {width: '50%'},
                    height: 300,
                    colors: ['#1b9e77', '#d95f02'],
                    hAxis: {
                        title: 'Total Population',
                        minValue: 0
                    },
                    vAxis: {
                        title: 'City'
                    }
                });
            }),
        google.charts.load("current", { packages: ["corechart"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["Month", "Bolivia", "Ecuador", "Madagascar", "Papua New Guinea", "Rwanda", "Average"],
                    ["2004/05", 165, 938, 522, 998, 450, 614.6],
                    ["2005/06", 135, 1120, 599, 1268, 288, 682],
                    ["2006/07", 157, 1167, 587, 807, 397, 623],
                    ["2007/08", 139, 1110, 615, 968, 215, 609.4],
                    ["2008/09", 136, 691, 629, 1026, 366, 569.6]
                ]);
                new google.visualization.ComboChart(comboChart).draw(a, {
                    title : 'Monthly Coffee Production by Country',
                    height: 300,
                    vAxis: {
                        title: 'Cups'
                    },
                    hAxis: {
                        title: 'Month'
                    },
                    seriesType: 'bars',
                    series: {5: {type: 'line'}}
                });
            }),
        google.charts.load("current", { packages: ["corechart"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["x", "dogs"],
                    [0, 0],
                    [1, 10],
                    [2, 23],
                    [3, 17],
                    [4, 18],
                    [5, 9],
                    [6, 11],
                    [7, 27],
                    [8, 33],
                    [9, 40],
                    [10, 32],
                    [11, 35]
                ]);
                new google.visualization.LineChart(lineChart).draw(a, {
                    height: 300,
                    hAxis: {
                        title: 'Time'
                    },
                    vAxis: {
                        title: 'Popularity'
                    }
                });
            }),
        google.charts.load("current", { packages: ["corechart"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["x", "dogs", "cats"],
                    [0, 0, 0],
                    [1, 10, 5],
                    [2, 23, 15],
                    [3, 17, 9],
                    [4, 18, 10],
                    [5, 9, 5],
                    [6, 11, 3],
                    [7, 27, 19]
                ]);
                new google.visualization.LineChart(lineChartMultiple).draw(a, {
                    height: 300,
                    hAxis: {
                        title: 'Time',
                        textStyle: {
                        color: '#01579b',
                        fontSize: 20,
                        fontName: 'Arial',
                        bold: true,
                        italic: true
                        },
                        titleTextStyle: {
                        color: '#01579b',
                        fontSize: 16,
                        fontName: 'Arial',
                        bold: false,
                        italic: true
                        }
                    },
                    vAxis: {
                        title: 'Popularity',
                        textStyle: {
                        color: '#1a237e',
                        fontSize: 24,
                        bold: true
                        },
                        titleTextStyle: {
                        color: '#1a237e',
                        fontSize: 24,
                        bold: true
                        }
                    },
                    colors: ['#a52714', '#097138']
                });
            }),
        google.charts.load("current", { packages: ["orgchart"] }),
            google.charts.setOnLoadCallback(function () {
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Name');
                data.addColumn('string', 'Manager');
                data.addColumn('string', 'ToolTip');
        
                // For each orgchart box, provide the name, manager, and tooltip to show.
                data.addRows([
                [{'v':'Mike', 'f':'Mike<div style="color:red; font-style:italic">President</div>'},
                '', 'The President'],
                [{'v':'Jim', 'f':'Jim<div style="color:red; font-style:italic">Vice President</div>'},
                'Mike', 'VP'],
                ['Alice', 'Mike', ''],
                ['Bob', 'Jim', 'Bob Sponge'],
                ['Carol', 'Bob', '']
                ]);
                new google.visualization.OrgChart(orgChart).draw(data, {
                    'allowHtml':true,
                    height: 300
                });
            }),
        google.charts.load("current", { packages: ["corechart"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["Task", "Hours per Day"],
                    ["Work", 11],
                    ["Eat", 2],
                    ["Commute", 2],
                    ["Watch TV", 2],
                    ["Sleep", 7]
                ]);
                new google.visualization.PieChart(pieChartBasic).draw(a, {
                    title: 'My Daily Activities',
                    height: 300
                });
            })
        google.charts.load("current", { packages: ["corechart"] }),
            google.charts.setOnLoadCallback(function () {
                var a = google.visualization.arrayToDataTable([
                    ["Task", "Hours per Day"],
                    ["Work", 11],
                    ["Eat", 2],
                    ["Commute", 2],
                    ["Watch TV", 2],
                    ["Sleep", 7]
                ]);
                new google.visualization.PieChart(pieChart3d).draw(a, {
                    title: 'My Daily Activities',
                    height: 300,
                    is3D: true,
                });
            })
    }
    
});