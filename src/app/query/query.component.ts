import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TodosService} from "../api/todos.service";
import {QueryTodosService} from "./query-todos.service";

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="todos$ | async as todos">
      <ul *ngIf="todos.data">
        <li *ngFor="let todo of todos.data">{{todo.id}} - {{todo.title}} - {{todo.completed}}</li>
      </ul>
      <h1 *ngIf="todos.isLoading">Loading....</h1>
      <p *ngIf="todos.isError">Error</p>
    </ng-container>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryComponent {
  todos$ = inject(QueryTodosService).getTodos().result$;
}
