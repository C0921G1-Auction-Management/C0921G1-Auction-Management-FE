import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-statistical-auction',
  templateUrl: './statistical-auction.component.html',
  styleUrls: ['./statistical-auction.component.css']
})
export class StatisticalAuctionComponent implements OnInit {
  private options: any;


  constructor() { }

  ngOnInit(): void {
    this.options = {
      // chart: {
      //   plotBackgroundColor: null,
      //     plotBorderWidth: null,
      //     plotShadow: false,
      //     type: 'pie'
      // },
      // title: {
      //   text: 'Browser market shares in January, 2018'
      // },
      // tooltip: {
      //   pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      // },
      // accessibility: {
      //   point: {
      //     valueSuffix: '%'
      //   }
      // },
      // plotOptions: {
      //   pie: {
      //     allowPointSelect: true,
      //       cursor: 'pointer',
      //       dataLabels: {
      //       enabled: true,
      //         format: '<b>{point.name}</b>: {point.percentage:.1f} %'
      //     }
      //   }
      // },
      // series: [{
      //   name: 'Brands',
      //   colorByPoint: true,
      //   data: [{
      //     name: 'Từ',
      //     y: 61.41,
      //     sliced: true,
      //     selected: true
      //   }, {
      //     name: 'Internet Explorer',
      //     y: 11.84
      //   }, {
      //     name: 'Firefox',
      //     y: 10.85
      //   }, {
      //     name: 'Edge',
      //     y: 4.67
      //   }, {
      //     name: 'Safari',
      //     y: 4.18
      //   }, {
      //     name: 'Sogou Explorer',
      //     y: 1.64
      //   }, {
      //     name: 'Opera',
      //     y: 1.6
      //   }, {
      //     name: 'QQ',
      //     y: 1.2
      //   }, {
      //     name: 'Other',
      //     y: 2.61
      //   }],
      // }]
      title: {
        text: 'Logarithmic axis demo'
      },

      xAxis: {
        tickInterval: 1,
        type: 'logarithmic',
        accessibility: {
          rangeDescription: 'Range: 1 to 10'
        }
      },

      yAxis: {
        type: 'logarithmic',
        minorTickInterval: 0.1,
        accessibility: {
          rangeDescription: 'Range: 0.1 to 1000'
        }
      },

      tooltip: {
        headerFormat: '<b>{series.name}</b><br />',
        pointFormat: 'x = {point.x}, y = {point.y}'
      },

      series: [{
        data: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
        pointStart: 1
      }]
    };
    Highcharts.chart('container', this.options);
  }

}
