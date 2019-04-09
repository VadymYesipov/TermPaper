import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Spring Mvc Angular Tutorial';

  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'brand name', 'model name', 'price', 'description', 'image'];

  bicycles: any;

  readonly APP_URL = 'http://localhost:8080';

  constructor(private _http: HttpClient) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.getAllBicycles();
  }

  getAllBicycles() {
    this._http.get(this.APP_URL + '/bicycles').subscribe(
      data => {
        this.bicycles = data;
        this.dataSource.data = this.bicycles;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }

  getContent(element: any, column: string) {
    switch (column){
      case 'brand name':
        return element['brand']['brandName'];
      case 'model name':
        return element['brand']['modelName'];
      case 'image':
        return element[column][column];
      default:
        return element[column];
    }
  }

}
