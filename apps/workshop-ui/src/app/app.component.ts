import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'app-root',
  template: ` <div class="App">
    <header>
      <h1>Hey, {{ title }} !</h1>
    </header>
    <body>
      <ol>
        <router-outlet></router-outlet>
      </ol>
    </body>
    <footer>
      
    </footer>
  </div>`,
  styles: [`
    .App {
      text-align: center;
      justify-content: center;
      align-items: column;
      font-family: Arial, sans-serif; 
    }
    h1 {
      font-family: Arial, sans-serif; 
    }
    p, a {
      font-family: Arial, sans-serif; 
    }
  `],
})
export class AppComponent {
  title = 'Workshop-UI';
}