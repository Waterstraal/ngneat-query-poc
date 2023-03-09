import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
      <div>
          <app-loadoff></app-loadoff>
      </div>
      <div>
          <app-query></app-query>
      </div>
  `,
  styles: [`:host {display: flex; flex-direction: row} div {flex: 1}`]
})
export class AppComponent {}
