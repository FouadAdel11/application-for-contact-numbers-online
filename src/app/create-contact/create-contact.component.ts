import { Component, Inject } from '@angular/core';
import {  MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../list/interface/contact.interface';
import { ApiService } from '../services/backend.service';
import { FormControl, Validators  } from '@angular/forms';


@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent {
  constructor(public dialogRef: MatDialogRef<CreateContactComponent>,
    private apiService: ApiService) {
  }
  data!: Contact
  name = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  address = new FormControl('')
       notes = new FormControl('');
    save(data:Contact) {
    const contact = {
      name: data.name,
      phone: data.phone,
      address: data.address,
      notes:data.notes
    }
    this.apiService.createContact(contact).subscribe(
      response => {
        console.log("response",response)
        this.onNoClick(response)
      },
      error => {
        alert(error.statusText)
        console.error('Error fetching data:', error);
      }
    );
    }
  createContact() {
    this.data = {
        _id:'',
            name: this.name.value || '',
      phone:this.phone.value ? +this.phone.value : 0,
      address:this.address.value ||'',
      notes:this.notes.value || '',
    }
   this.save(this.data)
  }
     onNoClick(response?:any): void {
    this.dialogRef.close(response);
  }
}
