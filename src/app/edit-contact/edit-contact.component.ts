import { Component  ,Inject} from '@angular/core';
import { Contact } from '../list/interface/contact.interface';
import { ApiService } from '../services/backend.service';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
  userId:string=""
constructor(public dialogRef: MatDialogRef<EditContactComponent>,
  private apiService: ApiService, @Inject(MAT_DIALOG_DATA) public data: Contact) {
  this.userName = data.name
  this.phoneNumber = data.phone
  this.userAddress = data.address
  this.userNotes = data.notes
  this.userId=data._id
}

      edit(data:Contact) {
        const contact = {
      userId:data._id,
      name: data.name,
      phone: data.phone,
      address: data.address,
      notes:data.notes
    }
 this.apiService.editContact(contact.userId,data).subscribe(
    response => {
      console.log("response",response);
      this.onNoClick(response);
    },
   error => {
      alert(error.statusText)
      console.error('Error fetching data:', error);
    }
  );
    }
  updateContact() {
    this.updateData = {
        _id:this.userId,
            name: this.name.value || '',
      phone:this.phone.value ? +this.phone.value : 0,
      address:this.address.value ||'',
      notes:this.notes.value || '',
    }
   this.edit(this.updateData)
  }
     onNoClick(response?:any): void {
    this.dialogRef.close(response);
  }
}
