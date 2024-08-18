import { Component  ,Inject} from '@angular/core';
import { Contact } from '../list/interface/contact.interface';
import { ApiService } from '../services/backend.service';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {SocketService} from"../services/socket.service"
@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent {
  updateData!: Contact
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('')
  notes = new FormControl('');
  userName: string = ''
  phoneNumber: number = 0
  userAddress: string = ""
  userNotes: string = ""
  userId: string = ""
  updateBy: string = ""
  limit: number = 0
  offset:number=0
constructor(public dialogRef: MatDialogRef<EditContactComponent>,
  private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: Contact,
  private socketService: SocketService) {
  console.log(data);
  this.userName = data.name
  this.phoneNumber = data.phone
  this.userAddress = data.address
  this.userNotes = data.notes
  this.userId = data._id
  this.limit = data.limit || 0
  this.offset=data.offset||0
  this.updateBy = localStorage.getItem('userName')||''
  console.log(this.updateBy);
}

      edit(data:Contact) {
        const contact = {
      userId:data._id,
      name: data.name,
      phone: data.phone,
      address: data.address,
          notes: data.notes,
          updateBy: data.updateBy,
       limit: data.limit,
       offest:data.offset
        }

        this.socketService.sendData(data)
        this.socketService.onData().subscribe(res => {
          if (res) {
            this.onNoClick(res)
          } else {
            alert("there are problem in update real time")
              console.error('Error fetching data:');
            }
        })
      }

  updateContact() {
    this.updateData = {
        _id:this.userId,
            name: this.name.value || '',
      phone:this.phone.value ? +this.phone.value : 0,
      address:this.address.value ||'',
      notes: this.notes.value || '',
      updateBy: this.updateBy || '',
      limit: this.limit || 0,
      offset:this.offset||0
    }
   this.edit(this.updateData)
  }
     onNoClick(response?:any): void {
    this.dialogRef.close(response);
  }
}
