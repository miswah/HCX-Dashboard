import { Component, OnInit } from "@angular/core";
import { NbColorHelper, NbDateService, NbThemeService } from "@nebular/theme";

@Component({
  selector: "ngx-trend-analysis",
  templateUrl: "./trend-analysis.component.html",
  styleUrls: ["./trend-analysis.component.scss"],
})
export class TrendAnalysisComponent implements OnInit {
  min: Date;
  max: Date;

  categories: String[] = [
    "All",
    "Pre Auth Request",
    "Pre Auth Response",
    "Enhance Request",
    "Enhance Response",
    "Query Request",
    "Query Response",
  ];

  //Trends Graph
  dataTrends: {};
  optionsTrends: any;
  themeSubscriptionTrends: any;

  //Total Claims Graph
  optionsClaims: any = {};
  themeSubscriptionClaims: any;

  //Success to error Graph
  dataS2E: any;
  optionsS2E: any;
  themeSubscriptionS2E: any;

  constructor(
    protected dateService: NbDateService<Date>,
    private theme: NbThemeService
  ) {}

  ngOnInit(): void {
    this.min = this.dateService.addDay(this.dateService.today(), -5);
    this.max = this.dateService.addDay(this.dateService.today(), 5);
    this.setTrendsGraph();
    this.setTotalClaimsGraph();
    this.setSuccessfulToErrorGraph();
  }

  setTrendsGraph() {
    this.themeSubscriptionTrends = this.theme
      .getJsTheme()
      .subscribe((config) => {
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.dataTrends = {
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
              label: "dataset - big points",
              data: [
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
              ],
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              fill: false,
              borderDash: [5, 5],
              pointRadius: 8,
              pointHoverRadius: 10,
            },
            {
              label: "dataset - individual point sizes",
              data: [
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
              ],
              borderColor: colors.dangerLight,
              backgroundColor: colors.dangerLight,
              fill: false,
              borderDash: [5, 5],
              pointRadius: 8,
              pointHoverRadius: 10,
            },
            {
              label: "dataset - large pointHoverRadius",
              data: [
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
              ],
              borderColor: colors.info,
              backgroundColor: colors.info,
              fill: false,
              pointRadius: 8,
              pointHoverRadius: 10,
            },
            {
              label: "dataset - large pointHitRadius",
              data: [
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
                this.random(),
              ],
              borderColor: colors.success,
              backgroundColor: colors.success,
              fill: false,
              pointRadius: 8,
              pointHoverRadius: 10,
            },
          ],
        };

        this.optionsTrends = {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: "bottom",
            labels: {
              fontColor: chartjs.textColor,
            },
          },
          hover: {
            mode: "index",
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Month",
                },
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
            yAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Value",
                },
                gridLines: {
                  display: true,
                  color: chartjs.axisLineColor,
                },
                ticks: {
                  fontColor: chartjs.textColor,
                },
              },
            ],
          },
        };
      });
  }

  setTotalClaimsGraph() {
    this.themeSubscriptionClaims = this.theme
      .getJsTheme()
      .subscribe((config) => {
        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.optionsClaims = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: "Score",
              type: "bar",
              barWidth: "60%",
              data: [10, 52, 200, 334, 390, 330, 220],
            },
          ],
        };
      });
  }

  setSuccessfulToErrorGraph() {
    this.themeSubscriptionS2E = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;
      console.log(colors);
      // 00FF00
      // FF0000
      this.dataS2E = {
        labels: ["03", "04", "05", "06", "07", "08", "09"],
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 55, 40],
            label: "Success",
            backgroundColor: NbColorHelper.hexToRgbA("#00FF00", 0.8),
          },
          {
            data: [28, 48, 40, 19, 86, 27, 90],
            label: "Error",
            backgroundColor: NbColorHelper.hexToRgbA("#FF0000", 0.8),
          },
        ],
      };

      this.optionsS2E = {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  private random() {
    return Math.round(Math.random() * 100);
  }

  ngOnDestroy(): void {
    this.themeSubscriptionTrends.unsubscribe();
    this.themeSubscriptionClaims.unsubscribe();
    this.themeSubscriptionS2E.unsubscribe();
  }
}
