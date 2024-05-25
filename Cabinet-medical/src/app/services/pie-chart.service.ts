import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {

  constructor(private _http: HttpClient) {}

 
  getPieChart(): Observable<any> {
    return this._http.get('http://localhost:3000/PieChart');
  }
}
