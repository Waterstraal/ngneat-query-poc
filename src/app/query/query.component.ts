import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QueryTodosService} from "./query-todos.service";

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="reload()">REFRESH</button>
    <button (click)="add()">ADD</button>

    <div *ngIf="activeTodo$ | async as activeTodo">
      selected: {{ activeTodo.data?.title }}
    </div>

    <ng-container *ngIf="todos$ | async as todos">
      <ul *ngIf="todos.fetchStatus !== 'fetching' && todos.data">
        <li (click)="setId(todo.id)" *ngFor="let todo of todos.data">{{todo.id}} - {{todo.title}}
          - {{todo.completed}}</li>
      </ul>
      <h1 *ngIf="todos.fetchStatus === 'fetching'">Loading....</h1>
      <p *ngIf="todos.isError">Error</p>
    </ng-container>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QueryComponent {
  queryTodosService = inject(QueryTodosService);
  todos$ = this.queryTodosService.getTodos();
  activeTodo$ = this.queryTodosService.getActiveTodo();

  reload() {
    this.queryTodosService.refresh();
  }

  setId(id: number) {
    this.queryTodosService.setActiveId(id);
  }

  add() {
     this.queryTodosService.addTodo().mutate({id: 0, title: '', userId: 123, completed: false});
    // this.queryTodosService.addTodo2({id: 0, title: '', userId: 123, completed: false});
  }
}
