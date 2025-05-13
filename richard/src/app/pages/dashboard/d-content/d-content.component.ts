import { Component } from '@angular/core';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ChartType,
  NgxApexchartsModule
} from 'ngx-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
};

@Component({
  selector: 'app-d-content',
  standalone: true,
  imports: [NgxApexchartsModule],
  templateUrl: './d-content.component.html',
  styleUrls: ['./d-content.component.css']
})
export class DContentComponent {
  public chartOptions: ChartOptions = {
    series: [10, 12, 8, 5, 15],
    chart: {
      type: 'donut' as ChartType,
      width: 380
    },
    labels: ['Proyecto A', 'Proyecto B', 'Proyecto C', 'Proyecto D', 'Proyecto E'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };
  

  public barChart = {
    series: [{
      data: [30, 45, 25, 10, 60]
    }],
    chart: {
      type: 'bar' as ChartType,
      height: 380
    },
    plotOptions: {
      bar: {
        barHeight: '100%',
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#f48024'],
    dataLabels: {
      enabled: true,
      textAnchor: 'start' as const,
      style: {
        colors: ['#fff']
      },
      formatter: function (val: number, opt: any) {
        return opt.w.globals.labels[opt.dataPointIndex] + ": " + val;
      },
      offsetX: 0,
      dropShadow: {
        enabled: true
      }
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      categories: ['Proyecto A', 'Proyecto B', 'Proyecto C', 'Proyecto D', 'Proyecto E']
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    title: {
      text: '',
      align: 'center' as const,
      floating: true
    },
    subtitle: {
      text: '',
      align: 'center' as const
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false
      },
      y: {
        title: {
          formatter: function () {
            return '';
          }
        }
      }
    }
  };
  
  
}
