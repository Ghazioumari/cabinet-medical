import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../services/employee.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { CategoryService } from '../services/category.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './Medicament.component.html',
  styleUrls: ['./Medicament.component.scss']
})
export class BooksComponent {
  displayedColumns: string[] = [
    'id',
    'nom',
    'description',
    'category',
    'price',
    'action',
  ];

  listeCategory:any

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private _bookService :BookService
  ) {}

  
  ngOnInit(): void {
    this.getBookList();
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log(val)
          this.getBookList();
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

  deleteEmployee(id: number) {
    this._bookService.deleteBook(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Medicament deleted!', 'done');
        this.getBookList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getBookList();
        }
      },
    });
  }



  listebook:any;


  getBookList() {
    this._bookService.getBookList().subscribe({
      next: (res: any) => {
        this.listebook = new MatTableDataSource(res);
        this.listebook.sort = this.sort;
        this.listebook.paginator = this.paginator;
        console.log(res);
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }



}
