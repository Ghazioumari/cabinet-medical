import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { CategoryService } from '../services/category.service';
import { PatientService } from '../services/patient.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-pat-details',
  templateUrl: './pat-details.component.html',
  styleUrls: ['./pat-details.component.scss']
})
export class PatDetailsComponent {
  displayedColumns: string[] = [
    'id',
    'nom',
    'description',
    'category',
    'price',
  ];

  //listePatient:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _patientService: PatientService,
    private route:ActivatedRoute
     ) {}

  PatinetId: any
  ngOnInit(): void {
    this.PatinetId=this.route.snapshot.paramMap.get("id");

    this.getMeducamentByPatient()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }


  data:any;

  getMeducamentByPatient()
  {
    this._patientService.getMeducamentByPatient(this.PatinetId).subscribe({
      next: (res: any) => {
        this.data=res
        console.log(this.data);
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }


  printTable(): void {
    const printWindow = window.open('', '_blank');
    const content = document.getElementById('print-table-content');

    if (printWindow && content) {
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write('<style>@media print {body {-webkit-print-color-adjust: exact;}}</style>');
      printWindow.document.write(content.innerHTML);
      printWindow.document.write('</body></html>');

      printWindow.document.close();

      setTimeout(() => {
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      }, 100);
    }
  }

}
