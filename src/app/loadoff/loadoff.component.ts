import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadoffTodosService} from "./loadoff-todos.service";

@Component({
  selector: 'app-loadoff',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="todos$ | async as todos">
      <ul *ngIf="todos.res">
        <li *ngFor="let todo of todos.res">{{todo.id}} - {{todo.title}} - {{todo.completed}}</li>
      </ul>
      <h1 *ngIf="todos.loading">Loading....</h1>
      <p *ngIf="todos.error">Error</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadoffComponent {
  loadoffService = inject(LoadoffTodosService);

  todos$ = this.loadoffService.getTodos();
}
