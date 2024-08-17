import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../list/interface/contact.interface';
import { ApiService } from '../services/backend.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  userName: string = ''
  userId: string = ''
  userNumber:number=0
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Contact ,private apiService: ApiService
  ) {
    console.log(data);
    this.userName = data.name
    this.userNumber=data.phone
    this.userId= data._id
  }


  deleteContact(id: string) {
  this.apiService.deleteContact(id).subscribe(
    response => {
      console.log("response", response);
      this.onNoClick(response)
    },
    error => {
      console.error('Error fetching data:', error);
    }
  );

 }
  confirm(): void{
    this.deleteContact(this.userId)
  }
   onNoClick(response?:any): void {
    this.dialogRef.close(response);
  }
}
