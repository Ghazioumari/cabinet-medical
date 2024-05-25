import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'node_modules/chart.js'
//import { MasterService } from '../service/master.service';
//import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { PieChartService } from '../services/pie-chart.service';

Chart.register(...registerables);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  constructor(private http:HttpClient, private _pieChart: PieChartService) { }

  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = [];

//-----------------------------------------pie----------------------------------------------
  chartdataPie: any;
  labeldataPie: any[] = [];
  realdataPie: any[] = [];
  colordataPie: any[] = [];

//---------------------------------Number for cards--------------------------------------
nbrectot:any
nbmunicipalite:any
nbtypes:any


  ngOnInit(): void {

    this.AfficheBarChart();
    this.AffichePieChart();
    
   // var aa = document.getElementById('myChart');
    //aa.height = 200; // Set the height to 200 pixels

  }


  AfficheBarChart()
  {
    this._pieChart.getPieChart().subscribe(result => {
      console.log(result)
      this.chartdata = result;
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length ;i++){
          console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].book);
          this.realdata.push(this.chartdata[i].count);
          //this.colordata.push(this.chartdata[i].colorcode);
        }
        console.log(this.labeldata);
        this.RenderChart(this.labeldata,this.realdata,'bar','barchart');
       
      }
    });
  
  }


AffichePieChart()
{
  this._pieChart.getPieChart().subscribe(result => {
    console.log(result)
    this.chartdataPie = result;
    if(this.chartdataPie!=null){
      for(let i=0; i<this.chartdataPie.length ;i++){
        console.log(this.chartdataPie[i]);
        this.labeldataPie.push(this.chartdataPie[i].book);
        this.realdataPie.push(this.chartdataPie[i].count);
        //this.colordata.push(this.chartdata[i].colorcode);
      }
      console.log(this.labeldataPie);
      this.RenderChart2(this.labeldataPie,this.realdataPie,'pie','piechart');
    }
  });

}

  RenderChart(labeldata:any,maindata:any,type:any,id:any) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [{
          label: '# of Votes',
          data: maindata,
          backgroundColor: ["#5b88e3","#d97cd9"],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }



  RenderChart2(labeldataPie:any,maindataPie:any,type:any,id:any) {
    const myChart = new Chart(id, {
      
      type: type,
      data: {
        labels: labeldataPie,
        datasets: [{
          label: '# of Votes',
          data: maindataPie,
          backgroundColor: ["#eb5979","#63c0e6","#9de065","#f2c97c"],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
      
    });
  }


}
