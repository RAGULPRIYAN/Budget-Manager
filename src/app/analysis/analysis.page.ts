import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { BudgetService } from '../services/budget.service';
import { Router } from '@angular/router';
import { FcmService } from '../services/fcm.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.page.html',
  styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
  analysisSvg:any
  chartData:any
  chartColor:any
  filteredData:any
  dateId:any
  noDataVisible:boolean=false
  constructor(private remainder:FcmService,private budget:BudgetService,private route: Router) { }

  ngOnInit() {
    this.processPieChart()
    this.getFilterData()
  }

  getFilterData(){
    this.remainder.getFilter().subscribe((res:any)=>{
  this.filteredData=res.data
    })
  }

  getFilterWiseData(event:any){
    const selectedValue = event.detail.value;
    console.log(selectedValue,'se')
    this.processPieChartWithId(selectedValue)
    // this.budget.getExpenseCountFilterDateId(selectedValue).subscribe((res:any)=>{
    //   console.log(res,'res checks date wise')
     
    // })
  }

  removeFilter(){
    this.dateId = " "
    // this.processPieChart()
  }


  processPieChart() {
    
    const margin1 = 10,
      width1 = 280,
      height1 = 280,
      radius1 = Math.min(width1, height1) / 2 - margin1;

     

    this.analysisSvg = d3
      .select("figure#processBar")
      .append("svg")
      .attr("width", width1)
      .attr("height", height1)
      .append("g")
      .attr("transform", "translate(" + width1 / 2 + "," + height1 / 2 + ")");

    // Create a tooltip div
    const tooltip = d3
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
      .style("top", "50px") // Adjust these values as needed
      .style("left", "50px"); // Adjust these values as needed


      this.budget.getExpenseCount().subscribe({
        next: (res: any) => {
          console.log(res.data, 'jjjjjjj');
          // this.processWiseData = res.data;
        this.chartData = res.data.topFive.map((process: any) => [process.expense, process.itemCount,process.id]);
        console.log(this.chartData)
        if(this.chartData == null){
          console.log('yes')
        }
        this.chartData.push(["Others", res.data.othersTotalCount,0]);
        console.log(this.chartData, "thirdData checks");
        const processOrder = res.data.topFive.map((d: any) => d.expense);
        console.log(processOrder, "processOrder checks");
        this.chartColor = []
        for (let e of this.chartData) {
          if (e[0] === res.data.topFive[0]?.expense) {
            this.chartColor.push("#BF63C6");
          } else if (e[0] === res.data.topFive[1]?.expense) {
            this.chartColor.push("#1E88E5");
          } else if (e[0] === res.data.topFive[2]?.expense) {
            this.chartColor.push("#25C16F");
          } else if (e[0] === res.data.topFive[3]?.expense) {
           this.chartColor.push("#FFBB00");
          } else if (e[0] === res.data.topFive[4]?.expense) {
            this.chartColor.push("#003057");
          } else if ( e[0] === 'Others') {
           this.chartColor.push("#848484");
          }
        }
         console.log(this.chartData,this.chartColor,'color checsk')
         const secondColors = d3
            .scaleOrdinal()
            .domain(processOrder)
            .range(this.chartColor);
            const totalSecondStars = this.chartData.reduce((acc: any, d: any) => acc + Number(d[1]), 0);
          console.log(totalSecondStars,'totalSecondStars  checsk')
          if (totalSecondStars === 0) {
            d3.select(".findingShowData").style("display", "none");
            d3.select(".noFindingData").style("display", "flex");
            return;
          }
          d3.select(".findingShowData").style("display", "block");
          d3.select(".noFindingData").style("display", "none");
          this.analysisSvg.selectAll("*").remove();
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
           
            // Add tooltip functionality
            .on("mouseover", function (event: MouseEvent, d: any) {
  
              const [x, y] = d3.pointer(event); // Get mouse coordinates relative to the SVG element
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
            // .attr("y", 10)
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
  
        },
        error: (err) => {
          console.log("error", err);
        },
      });
  }

  processPieChartWithId(id:any) {
    const margin1 = 10,
      width1 = 280,
      height1 = 280,
      radius1 = Math.min(width1, height1) / 2 - margin1;

      this.analysisSvg.selectAll("*").remove();
   

    // Create a tooltip div
    const tooltip = d3
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
      .style("top", "50px") // Adjust these values as needed
      .style("left", "50px"); // Adjust these values as needed


      this.budget.getExpenseCountFilterDateId(id).subscribe({
        next: (res: any) => {
          console.log(res.data, 'jjjjjjj');
          // this.processWiseData = res.data;
        this.chartData = res.data.topFive.map((process: any) => [process.expense, process.itemCount,process.id]);
        console.log(this.chartData,'dd')
        if(this.chartData == ''){
         
          this.noDataVisible=true
          
        }
        else{
          this.noDataVisible=false
        }
        this.chartData.push(["Others", res.data.othersTotalCount,0]);
        console.log(this.chartData, "thirdData checks");
        const processOrder = res.data.topFive.map((d: any) => d.expense);
        console.log(processOrder, "processOrder checks");
        this.chartColor = []
        for (let e of this.chartData) {
          if (e[0] === res.data.topFive[0]?.expense) {
            this.chartColor.push("#BF63C6");
          } else if (e[0] === res.data.topFive[1]?.expense) {
            this.chartColor.push("#1E88E5");
          } else if (e[0] === res.data.topFive[2]?.expense) {
            this.chartColor.push("#25C16F");
          } else if (e[0] === res.data.topFive[3]?.expense) {
           this.chartColor.push("#FFBB00");
          } else if (e[0] === res.data.topFive[4]?.expense) {
            this.chartColor.push("#003057");
          } else if ( e[0] === 'Others') {
           this.chartColor.push("#848484");
          }
        }
         console.log(this.chartData,this.chartColor,'color checsk')
         const secondColors = d3
            .scaleOrdinal()
            .domain(processOrder)
            .range(this.chartColor);
            const totalSecondStars = this.chartData.reduce((acc: any, d: any) => acc + Number(d[1]), 0);
          console.log(totalSecondStars,'totalSecondStars  checsk')
          if (totalSecondStars === 0) {
            d3.select(".findingShowData").style("display", "none");
            d3.select(".noFindingData").style("display", "flex");
            return;
          }
          d3.select(".findingShowData").style("display", "block");
          d3.select(".noFindingData").style("display", "none");
          this.analysisSvg.selectAll("*").remove();
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
           
            // Add tooltip functionality
            .on("mouseover", function (event: MouseEvent, d: any) {
  
              const [x, y] = d3.pointer(event); // Get mouse coordinates relative to the SVG element
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
            // .attr("y", 10)
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

            
  
        },
        error: (err) => {
          console.log("error", err);
        },
      });
  }
}
