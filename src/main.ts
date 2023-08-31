import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { TouchBoxComponent } from './components/touch-box/touch-box.component';

@Component({
  selector: 'my-app',
  standalone: true,
  templateUrl: `./main.html`,
  styleUrls: ['main.scss'],
  imports: [TouchBoxComponent],
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
