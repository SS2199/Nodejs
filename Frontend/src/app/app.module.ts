import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MessagesComponent } from '../messages/messages.component';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule  // <-- Add FormsModule here
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
