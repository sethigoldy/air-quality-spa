import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { StockChart as chart } from 'angular-highcharts';



import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    title = 'Test App - Home';
    data$:Subject<any>;
    historial_data = []
    options: any;
    citySelected:string;
    aqiChart: chart;
    table_data:any =[];
    
    constructor(private service: DataService) {
        this.data$ = this.service.connect();
    }

    showHistoricalData(city){
        this.citySelected = city;
        console.log(this.historial_data[this.citySelected])
        this.chartInit()
    }

    chartInit(){
        this.aqiChart = new chart({
            rangeSelector: {
              selected: 1
            },
            title: {
              text: `${this.citySelected} AQI Data`
            },
            series: [{
              tooltip: {
                valueDecimals: 2
              },
              name: this.citySelected,
              type: "line",
              data: this.historial_data[this.citySelected]
            }],
            chart:{
                animation: {
                    duration: 1
                }
            }
        });
    }

    ngOnInit(){
        this.data$.subscribe(res =>{
            let time = Date.now();
            res.forEach(city_res => {
                let to_save = [time,parseFloat(city_res.aqi.toFixed(2))]
                if(this.historial_data[city_res.city]){
                    this.historial_data[city_res.city].push(to_save) 
                }else{
                    this.historial_data[city_res.city] = [to_save]
                }
                this.table_data[city_res.city] = {
                    "value":city_res.aqi.toFixed(2),
                    "time": time
                }
                if(city_res.city == this.citySelected){
                    this.chartInit()
                }
            });
        });
    }
}
