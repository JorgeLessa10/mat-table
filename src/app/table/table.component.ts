import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface UserData {
  id: string;
  description: string;
}

/** Constants used to fill up our data base. */
const DESCRIPTIONS: string[] = [
  'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição',
  'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição', 'Descrição'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
 @Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'description'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

function createNewUser(id: number): UserData {
  const description = DESCRIPTIONS[Math.round(Math.random() * (DESCRIPTIONS.length - 1))];

  return {
    id: id.toString(),
    description: description,
  };
}
  