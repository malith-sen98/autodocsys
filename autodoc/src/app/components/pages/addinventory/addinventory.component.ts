import { Component, Inject, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog, MAT_DIALOG_DATA,MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import { InventoryService } from 'src/app/services/inventory.service';

import { StationService } from 'src/app/stationService/station.service';
import { AccountService } from 'src/app/services';


@Component({
  selector: 'app-addinventory',
  templateUrl: './addinventory.component.html',
  styleUrls: ['./addinventory.component.css']
})
export class AddinventoryComponent implements OnInit {
  item_id:any;
  item_type:string="";
  item_name:string="";
  quantity:any;
  price:any;
  
  
  st_id:any;
  constructor(private _stationServiceVariable:StationService,private _accountServiceVariable:AccountService,public dialogRefSer: MatDialogRef<AddinventoryComponent>, public service:InventoryService,public dialog: MatDialog) { }


  ngOnInit(): void {
    this.get_station_id();
  }

  get_station_id(){
    console.log(this._accountServiceVariable.accountValue,"acccccc");
    let user_email = this._accountServiceVariable.accountValue.email;

    this._stationServiceVariable.get_station_id( user_email )
    .subscribe(
      data=> {this.st_id = data[0].st_id;              
        console.log(this.st_id,"user id ???????");
      },
      error=> console.log('get user id error!',error)      
    );
  }

  onsubmit(){
    let arr=[this.item_type,this.item_name,this.quantity,this.price,this.st_id];
    this.service.addinventory(arr)
    .subscribe(
      (data)=> {console.log('successfully addedd!!',data)

      },
      error=>console.log('employee details error!!',error)

      );

      this.dialogRefSer.close();
  }

}

// import { Component, Inject, OnInit } from '@angular/core';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

// //Import Services
// import {
//   InventoryService,
// } from '.././../../../services';

// //Import Models
// import {
//   InventoryItem,
//   ServiceFiltServs,
//   ServiceFiltServsN,
//   ServiceStationServices
// } from '../../../../models';

// export interface DialogData {
//   listitem: Array<ServiceFiltServsN>;
//   newlistitem: Array<ServiceFiltServsN>;
// }


// @Component({
//   selector: 'app-add-services',
//   templateUrl: './add-services.component.html',
//   styleUrls: ['./add-services.component.css']
// })
// export class AddServicesComponent implements OnInit {
//   amut: number;
//   dur: number;
//   ser_name;
//   newlis : Array<ServiceFiltServsN> = [];

//   constructor(public dialogRefSer: MatDialogRef<AddServicesComponent>,private _inv: InventoryService,
//     @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

//   ngOnInit(): void {
    
//   }

//   valuechangeAmu(name) {
//     this.ser_name = name;
//   }

//   valuechangeDur(itm) {
//     let reqserv: ServiceFiltServsN = {
//       service_id: itm.service_id,
//       service_name: itm.service_name,
//       amount: Number(this.amut),
//       duration_hrs: Number(this.dur)
//     };
//     console.log(reqserv);
//     this.newlis.push(reqserv);
//     this.amut = 0.0;
//     this.dur = 0.0;
//     this.data.newlistitem = this.newlis;
//   }

//   onNoClick(): void {
//     this.dialogRefSer.close();
//   }

// }
