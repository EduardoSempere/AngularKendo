import { ICategory } from './icategory';

export interface IData {


      ProductID: number;
      ProductName: string;
      SupplierID: number;
      CategoryID: number;
      QuantityPerUnit: string;
      UnitPrice: number;
      UnitsInStock: number;
      UnitsOnOrder: number;
      ReorderLevel: number;
      Discontinued: boolean;
      Category: ICategory;
      sort: string;
}
