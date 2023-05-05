import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { SignalComponent } from './components/signal/signal.component';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, SignalComponent],
  template: `
    <div id="root">
      <h1>Hello from {{name}} with signals!</h1>

      <signal-autocomplete></signal-autocomplete>
    </div>
  `,
})
export class App {
  name = 'Angular';
}

bootstrapApplication(App);
