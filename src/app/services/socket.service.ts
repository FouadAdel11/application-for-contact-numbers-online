// src/app/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Contact } from '../list/interface/contact.interface';
import { environment } from '../../enivroments/enviroment'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  // Method to send messages
  sendData(data: Contact): void {
    this.socket.emit('editContact', data);
  }

  // Method to receive messages
  onData(): Observable<any> {
        return new Observable((observer) => {
      this.socket.on('sendContact', (data) => {
        observer.next(data);
      });
    });
  }

}
