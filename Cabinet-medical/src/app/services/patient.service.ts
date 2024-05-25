import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _http: HttpClient) {}


  getPatientList(): Observable<any> {
    return this._http.get('http://localhost:3000/patient');
  }
  deletePatient(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/patient/${id}`);
  }
  addPatient(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/patient', data);
  }

  updatePatient(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/patient/${id}`, data);
  }
  getMeducamentByPatient(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/medicament?patient=${id}`);
  }


}
