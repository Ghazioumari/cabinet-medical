import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatAddEditComponent } from '../pat-add-edit/pat-add-edit.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { CategoryService } from '../services/category.service';
import { PatientService } from '../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  displayedColumns: string[] = [
    'id',
    'nom',
    'prenom',
    'age',
    'maladie',
    'action',
  ];

  listePatient:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _coreService: CoreService,
    private _patientService :PatientService,
    private dialog: MatDialog,
    private _router: Router  // Inject the Router service
  ) {}

  
  ngOnInit(): void {
    this.getPatientList();
   // this.getMeducamentByPatient();

  }


  

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(PatAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log(val)
          this.getPatientList();
        }
        
      },
      
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listebook.filter = filterValue.trim().toLowerCase();

    if (this.listebook.paginator) {
      this.listebook.paginator.firstPage();
    }
  }

  deletePatient(id: number) {
    this._patientService.deletePatient(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Patient deleted!', 'done');
        this.getPatientList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(PatAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getPatientList();
        }
      },
    });
  }



  listebook:any;


  getPatientList() {
    this._patientService.getPatientList().subscribe({
      next: (res: any) => {
        this.listePatient = new MatTableDataSource(res);
        this.listePatient.sort = this.sort;
        this.listePatient.paginator = this.paginator;
        console.log(res);
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  getMeducamentByPatient(id:number)
  {
    this._patientService.getMeducamentByPatient(id).subscribe({
      next: (res: any) => {
        
        console.log(res);
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  details(id:number)
  {
    this._router.navigate(['site/details/',id]);
  }


}
