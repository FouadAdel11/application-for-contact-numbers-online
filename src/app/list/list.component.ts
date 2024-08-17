import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiService } from '../services/backend.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Contact } from './interface/contact.interface';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { CreateContactComponent } from '../create-contact/create-contact.component';
import { EditContactComponent } from '../edit-contact/edit-contact.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  limit: number = 5
  offset: number = 0
  lengthOfData: number = 0
  searchWord: string = ''
  contactList: Contact[] = [];
  filteredContacts:Contact[]=[]
  editContact:Partial<Contact>={};
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('modalEdit') modalEdit!: ElementRef;
  constructor(private http: HttpClient,
    private apiService: ApiService,
    public dialog: MatDialog) { }
  ngOnInit(){
    this.fetchData();
  }
  onPageChange(event: PageEvent) {
    this.limit = event.pageSize;
    this.offset = event.pageIndex * event.pageSize;
    this.fetchData()
  }

  fetchData() {
    this.apiService.getData(this.limit, this.offset).subscribe(
      response => {
        console.log("response",response)
        this.contactList = response.contacts;
        this.filteredContacts=this.contactList
        this.lengthOfData= response.totalCount
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }
  search() {
    const searchTerm = this.searchWord.toLowerCase();
        this.filteredContacts = this.contactList.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm) ||
          contact.phone.toString().includes(searchTerm) ||
          contact.address.toLowerCase().includes(searchTerm) ||
           contact.notes.toLowerCase().includes(searchTerm)
    );
}
  openModalEdit(contact:any){
    const dialogRef = this.dialog.open(EditContactComponent, { width: '500px' ,data:contact});
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.fetchData()
      } else {
        alert("edit not happen")
      }
    });
  }

 openDialog(data: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { width: '300px',data});
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.fetchData()
      } else {
        alert("delete not happen")
      }
    });
 }
   openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateContactComponent, { width: '500px'});
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.fetchData()
      } else {
        alert("create not happen")
      }
    });
  }

}
