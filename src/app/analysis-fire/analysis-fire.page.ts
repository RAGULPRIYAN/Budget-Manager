import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BudgetfireService } from '../services/budgetfire.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-analysis-fire',
  templateUrl: './analysis-fire.page.html',
  styleUrls: ['./analysis-fire.page.scss'],
})
export class AnalysisFirePage implements OnInit {

  analysisSvg:any;
  chartData:any;
  chartColor:any;
  filteredData:any;
  dateId:any;
  noDataVisible:boolean=false;

  constructor(private budget:BudgetfireService, private route: Router) { }

  ngOnInit() {
    this.createSvg();
    this.processPieChart();
    this.getFilterData();
  }

  createSvg() {
    const margin1 = 10, width1 = 280, height1 = 280;

    this.analysisSvg = d3
      .select("figure#processBar")
      .append("svg")
      .attr("width", width1)
      .attr("height", height1)
      .append("g")
      .attr("transform", "translate(" + width1 / 2 + "," + height1 / 2 + ")");
  }

  getFilterData() {
    this.filteredData = this.budget.getFilter();
  }

  getFilterWiseData(event:any) {
    const selectedValue = event.detail.value;
    console.log(selectedValue, 'selected value');
    this.processPieChartWithId(selectedValue);
  }

  removeFilter() {
    this.dateId = "";
    this.processPieChart();
  }

  createTooltip() {
    return d3
      .select("figure#processBar")
      .append("span")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("background-color", "black")
      .style("color", "white")
      .style("padding", "5px")
      .style("border-radius", "1px")
      .style("pointer-events", "none")
      .style("transition", "opacity 0.3s ease")
      .style("position", "absolute")
      .style("top", "50px")
      .style("left", "50px");
  }

  processPieChart() {
    const margin1 = 10, width1 = 280, height1 = 280, radius1 = Math.min(width1, height1) / 2 - margin1;
    const tooltip = this.createTooltip();

    this.budget.getExpenseCount().subscribe({
      next: (res: any) => {
        console.log(res, 'response data');
        this.chartData = res.topFive.map((process: any) => [process.expense, process.itemCount, process.id]);
        this.chartData.push(["Others", res.othersTotalCount, 0]);
        
        this.chartColor = this.generateChartColors(res.topFive);
        const processOrder = res.topFive.map((d: any) => d.expense);

        const secondColors = d3.scaleOrdinal().domain(processOrder).range(this.chartColor);
        const totalSecondStars = this.chartData.reduce((acc: any, d: any) => acc + Number(d[1]), 0);

        if (totalSecondStars === 0) {
          this.noDataVisible = true;
          d3.select(".findingShowData").style("display", "none");
          d3.select(".noFindingData").style("display", "flex");
          return;
        } else {
          this.noDataVisible = false;
          d3.select(".findingShowData").style("display", "block");
          d3.select(".noFindingData").style("display", "none");
        }

        this.renderPieChart(radius1, secondColors, tooltip);
      },
      error: (err: any) => {
        console.log("error", err);
      }
    });
  }

  processPieChartWithId(filter: string) {
    const margin1 = 10, width1 = 280, height1 = 280, radius1 = Math.min(width1, height1) / 2 - margin1;
    const tooltip = this.createTooltip();

    let startDate: Date;
    const endDate = new Date();

    if (filter === 'Daily') {
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 1);
    } else if (filter === 'Weekly') {
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
    } else if (filter === 'Monthly') {
      startDate = new Date();
      startDate.setMonth(endDate.getMonth() - 1);
    } else {
      console.error('Invalid filter provided');
      return;
    }

    this.budget.getExpenseCountByDateRange(startDate, endDate).subscribe({
      next: (res: any) => {
        console.log(res.data, 'filtered response data');
        this.chartData = res.topFive.map((process: any) => [process.expense, process.itemCount, process.id]);
        this.chartData.push(["Others", res.othersTotalCount, 0]);

        this.chartColor = this.generateChartColors(res.topFive);
        const processOrder = res.topFive.map((d: any) => d.expense);

        const secondColors = d3.scaleOrdinal().domain(processOrder).range(this.chartColor);
        const totalSecondStars = this.chartData.reduce((acc: any, d: any) => acc + Number(d[1]), 0);

        if (totalSecondStars === 0) {
          this.noDataVisible = true;
          d3.select(".findingShowData").style("display", "none");
          d3.select(".noFindingData").style("display", "flex");
          return;
        } else {
          this.noDataVisible = false;
          d3.select(".findingShowData").style("display", "block");
          d3.select(".noFindingData").style("display", "none");
        }

        this.renderPieChart(radius1, secondColors, tooltip);
      },
      error: (err: any) => {
        console.log("error", err);
      }
    });
  }

  generateChartColors(topFive: any) {
    const colors = ["#BF63C6", "#1E88E5", "#25C16F", "#FFBB00", "#003057", "#848484"];
    return topFive.map((process: any, index: number) => colors[index] || "#848484");
  }

  renderPieChart(radius1: number, secondColors: any, tooltip: any) {
    const secondPie = d3.pie<any>().value((d: any) => Number(d[1]));
        const arcs = this.analysisSvg
          .selectAll("pieces")
          .data(secondPie(this.chartData))
          .enter()
          .append("path") 
          .attr(
            "d",
            d3
              .arc()
              .innerRadius(radius1 - 20)
              .outerRadius(radius1)
          )
          .attr("fill", (d: any, i: any) => secondColors(d.data[0]))
          .style("stroke-width", "1px")
          .on("mouseover", function (event: MouseEvent, d: any) {
            const [x, y] = d3.pointer(event);
            tooltip.transition()
              .duration(200)
              .style("opacity", .9);
            tooltip.html(d.data[0] + ": " + d.data[1]);
          })
          .on("mousemove", function (event: MouseEvent, d: any) {
            tooltip.style("top", event.pageY + "px").style("left", event.pageX + "px");
          })
          .on("mouseout", function (d: any) {
            tooltip.transition()
              .duration(500)
              .style("opacity", 0);
          });

        arcs
          .transition()
          .duration(1000)
          .attrTween("d", (d: any) => {
            const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
            return (t: any) => {
              return d3.arc().innerRadius(90 - 20).outerRadius(radius1)(interpolate(t));
            };
          });

        this.analysisSvg
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .style("font-size", "50px")
          .style("font-weight", "bold")
          // .text(this.processCount);

        this.analysisSvg
          .append("text")
          .attr("text-anchor", "middle")
          .attr("dominant-baseline", "middle")
          .style("font-size", "20px")
          .text("Expenses");

        const secondLabelLocation = d3.arc().innerRadius(radius1 - 40).outerRadius(radius1);

        this.analysisSvg
          .selectAll("pieces")
          .data(secondPie(this.chartData))
          .enter()
          .append("text")
          .attr("transform", (d: any) => "translate(" + secondLabelLocation.centroid(d) + ")")
          .style("text-anchor", "middle")
          .style("font-size", 15);
  }
}
