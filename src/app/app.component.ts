import { Component } from '@angular/core';
import { SortDescriptor, orderBy, State } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, SelectableSettings, SelectAllCheckboxState } from '@progress/kendo-angular-grid';
import { IData } from './model/idata';
import { valueKcombobox } from './const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    this.loadProducts(); 
  }

  public checkboxOnly = false;
  public disableCheck = true;
  public disableButton = true;
  public mode = 'multiple';
 
  public allowCustom = true;
  public listItems: Array<string> = ["Don't price", 'Price'];
  mySelection: number[] = [];
  valorCombo: any;
  param: number[] = [];
  title = 'dashboard';
  public multiple = false;
  public allowUnsort = true;

  comboDisable = true;

 
  public sort1: SortDescriptor[] = [{
    field: 'UnitPrice',
    dir: 'asc'
  }];
  public sort2: SortDescriptor[] = [{
    field: 'ProductName',
    dir: 'asc'
  }];

  public state: State = {
    skip: 0,
    take: 15,

    // Initial filter descriptor
    filter: {
      logic: 'and',
      filters: []
    }
  };

  public gridData: IData[] = [
    {
      "ProductID": 1,
      "ProductName": "Chai",
      "SupplierID": 1,
      "CategoryID": 1,
      "QuantityPerUnit": "10 boxes x 20 bags",
      "UnitPrice": 18.0000,
      "UnitsInStock": 39,
      "UnitsOnOrder": 0,
      "ReorderLevel": 10,
      "Discontinued": false,
      "Category": {
        "CategoryID": 1,
        "CategoryName": "Beverages",
        "Description": "Soft drinks, coffees, teas, beers, and ales"
      },
      "sort": "",
    },
    {
      "ProductID": 2,
      "ProductName": "Chang",
      "SupplierID": 1,
      "CategoryID": 1,
      "QuantityPerUnit": "24 - 12 oz bottles",
      "UnitPrice": 19.0000,
      "UnitsInStock": 17,
      "UnitsOnOrder": 40,
      "ReorderLevel": 25,
      "Discontinued": false,
      "Category": {
        "CategoryID": 1,
        "CategoryName": "Beverages",
        "Description": "Soft drinks, coffees, teas, beers, and ales"
      },
      "sort": "",
    },
    {
      "ProductID": 3,
      "ProductName": "Aniseed Syrup",
      "SupplierID": 1,
      "CategoryID": 2,
      "QuantityPerUnit": "12 - 550 ml bottles",
      "UnitPrice": 10.0000,
      "UnitsInStock": 13,
      "UnitsOnOrder": 70,
      "ReorderLevel": 25,
      "Discontinued": false,
      "Category": {
        "CategoryID": 2,
        "CategoryName": "Condiments",
        "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
      },
      "sort": "",
    },
    {
      "ProductID": 4,
      "ProductName": "Chef Anton's Cajun Seasoning",
      "SupplierID": 2,
      "CategoryID": 2,
      "QuantityPerUnit": "48 - 6 oz jars",
      "UnitPrice": 22.0000,
      "UnitsInStock": 53,
      "UnitsOnOrder": 0,
      "ReorderLevel": 0,
      "Discontinued": false,
      "Category": {
        "CategoryID": 2,
        "CategoryName": "Condiments",
        "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
      },
      "sort": "",
    },
    {
      "ProductID": 5,
      "ProductName": "Chef Anton's Gumbo Mix",
      "SupplierID": 2,
      "CategoryID": 2,
      "QuantityPerUnit": "36 boxes",
      "UnitPrice": 21.3500,
      "UnitsInStock": 0,
      "UnitsOnOrder": 0,
      "ReorderLevel": 0,
      "Discontinued": false,
      "Category": {
        "CategoryID": 2,
        "CategoryName": "Condiments",
        "Description": "Sweet and savory sauces, relishes, spreads, and seasonings"
      },
      "sort": "",
    }
  ];

  public gridView: GridDataResult;

  
 
  public selectionChange(value: string): void {
    console.log('selectionChange', value);
    if (value === valueKcombobox.dontPrice) {
      let obj: IData;
      this.deleteAllImage();
      for (let index = 0; index < this.param.length; index++) {
        obj = this.gridData.find(data => data.ProductID === this.param[index])
        if (obj) {
          obj.Discontinued = true;
        }
      }

 
      this.disableCheck = false;
      this.mySelection = []; 
      this.disableButton = true;
      this.comboDisable = true;



    }
    if (value === valueKcombobox.price) {
      let obj: IData;

      for (const id of this.param) {
        obj = this.gridData.find(data => data.ProductID === id);
        if (obj) {
          obj.Discontinued = false;
        }
      }
      this.disableCheck = false;
      this.mySelection = [];
      this.disableButton = true;
      this.comboDisable = true;

    }
  }

  deleteAllImage() {
    for (let index = 0; index < this.gridData.length; index++) {
      this.gridData[index].Discontinued = false;

    }
  }

  public onSelectedKeysChange(p: any) {

    if (p.length > 0) {
      this.comboDisable = false;
      this.disableButton = false;

    } else {
      this.comboDisable = true;
      this.disableButton = true;
    }

    this.param = p;



  }

  public sortChange(sort1: SortDescriptor[]): void {
    this.sort1 = sort1;
    this.loadProducts();
  }

  private loadProducts(): void {
    this.gridView = {
      data: orderBy(this.gridData, this.sort1),
      total: this.gridData.length
    };
    console.log(this.gridView);
  }


}
