import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service'; // Import the service

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: any[] = [];
  message: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages() {
    this.messageService.getMessages().subscribe((res: any) => {
      if (res.success) {
        this.messages = res.messages;
      }
    });
  }

  addMessage(event: Event) {
    event.preventDefault();
    if (!this.message.trim()) return;

    this.messageService.addMessage(this.message).subscribe((res: any) => {
      if (res.success) {
        this.message = '';
        this.fetchMessages();
      }
    });
  }
}
