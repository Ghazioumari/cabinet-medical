import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { EmployeeService } from '../services/employee.service';
import { CategoryService } from '../services/category.service';
import { PatientService } from '../services/patient.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  bookForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ];

  constructor(
    private _bookService: BookService,
    private _catService: CategoryService,
    private _fb: FormBuilder,
    private _patService: PatientService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.bookForm = this._fb.group({
      nom: '',
      description: '',
      category: '',
      patient: '',
      price: '',
    });
  }

  ngOnInit(): void {
    this.bookForm.patchValue(this.data);
    this.getCategoryList();
    this.getPatientList();

  }

  selectedOption: any; // Property to store the selected value

// Method to handle the selection change
onSelectChange(event: any) {
  this.selectedOption = event.value;
}

  onFormSubmit() {
    if (this.bookForm.valid) {
      if (this.data) {
        this._bookService
          .updateBook(this.data.id, this.bookForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Medicament updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._bookService.addBook(this.bookForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Medicament added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }








  listeCat:any;
  listePat:any;


  getCategoryList() {
    this._catService.getCategoryList().subscribe({
      next: (res: any) => {
        this.listeCat = res;
        console.log(this.listeCat);
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  
  getPatientList() {
    this._patService.getPatientList().subscribe({
      next: (res: any) => {
        this.listePat = res;
        console.log(this.listePat);
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }








}
