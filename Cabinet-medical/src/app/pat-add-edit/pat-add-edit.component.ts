import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-pat-add-edit',
  templateUrl: './pat-add-edit.component.html',
  styleUrls: ['./pat-add-edit.component.scss']
})
export class PatAddEditComponent {
  PatientForm: FormGroup;


  constructor(
    private _fb: FormBuilder,
    private _patService: PatientService,
    private _dialogRef: MatDialogRef<PatAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.PatientForm = this._fb.group({
      nom: '',
      prenom: '',
      age: '',
      maladie: '',
    });
  }

  ngOnInit(): void {
    this.PatientForm.patchValue(this.data);
    this.getPatientList();
  }

  selectedOption: any; // Property to store the selected value

// Method to handle the selection change
onSelectChange(event: any) {
  this.selectedOption = event.value;
}

  onFormSubmit() {
    if (this.PatientForm.valid) {
      if (this.data) {
        this._patService
          .updatePatient(this.data.id, this.PatientForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Patient updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._patService.addPatient(this.PatientForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Patient added successfully');
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
