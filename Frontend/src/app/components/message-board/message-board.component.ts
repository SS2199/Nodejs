import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-message-board',
  templateUrl: './message-board.component.html',
  styleUrls: ['./message-board.component.css'],
})
export class MessageBoardComponent implements OnInit {
  messages: string[] = [];
  newMessage = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.dataService.getMessages().subscribe((response) => {
      if (response.success) {
        this.messages = response.messages.map((msg: any) => msg.message);
      }
    });
  }

  addMessage(): void {
    if (this.newMessage.trim()) {
      this.dataService.addMessage(this.newMessage).subscribe((response) => {
        if (response.success) {
          this.newMessage = '';
          this.fetchMessages();
        }
      });
    }
  }
}
