import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Category } from '../models/models';
import { BookService } from '../services/book.service';
import { CategoryService } from '../services/category.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  displayedColumns: string[] = [
    'id',
    'nom',
    
  ];

  constructor( private _category: CategoryService, private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService,
    private _bookService :BookService) {
   
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  listeCat:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  getCategoryList() {
    this._category.getCategoryList().subscribe({
      next: (res: any) => {
        this.listeCat = res;
        console.log(this.listeCat);
        //this.dataSource.sort = this.sort;
        //this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listeCat.filter = filterValue.trim().toLowerCase();

    if (this.listeCat.paginator) {
      this.listeCat.paginator.firstPage();
    }
  }



}
