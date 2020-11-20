import { Component } from '@angular/core';
import { SortDescriptor, orderBy, State } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent, SelectableSettings, SelectAllCheckboxState } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    this.loadProducts();
    this.setSelectableSettings();
  }

  public checkboxOnly = false;
  public disableCheck = true;
  public disableButton = true;
  public mode = 'multiple';
  public drag = false;
  public selectableSettings: SelectableSettings;

  public allowCustom = true;
  public listItems: Array<string> = ["Don't price", 'Price'];
  mySelection: any[] = [];
  valorCombo: any;
  param: any[] = [];
  title = 'dashboard';
  public multiple = false;
  public allowUnsort = true;

  comboDisable: boolean = true;

  public setSelectableSettings(): void {
    if (this.checkboxOnly || this.mode === 'single') {
      this.drag = false;
    }

    this.selectableSettings = {
      enabled: true,
      checkboxOnly: this.checkboxOnly,

      drag: this.drag
    };
  }

  public valueChange(value: any): void {
    console.log('valueChange', value);
  }

  public selectionChange(value: any): void {
    console.log('selectionChange', value);
    if (value == "Don't price") {
      let obj: any;
      this.deleteAllImage();
      for (let index = 0; index < this.param.length; index++) {
        obj = this.gridData.find(data => data.ProductID == this.param[index])
        if (obj) {
          obj.Discontinued = true;
        }
      }

 
      this.disableCheck = false;
      this.mySelection = []; 
      this.disableButton = true;
      this.comboDisable = true;

    }
    if (value == "Price") {
      let obj: any;

      for (let index = 0; index < this.param.length; index++) {
        obj = this.gridData.find(data => data.ProductID == this.param[index])
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

  reset() {
    this.disableCheck = true;
    this.disableButton = true;
    this.mySelection = [];
    this.param = [];
    this.deleteAllImage();
    this.selectableSettings = {
      enabled: true,
      checkboxOnly: this.checkboxOnly,

      drag: this.drag
    };

    this.valorCombo = null;
  }

  public filterChange(filter: any): void {
    console.log('filterChange', filter);
    this.gridData = this.gridData.filter((s) => s.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
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

  public gridData: any[] = [
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
