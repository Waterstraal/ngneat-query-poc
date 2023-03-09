import {inject, Injectable} from '@angular/core';
import {QueryClientService, UseMutation, UseQuery} from "@ngneat/query";
import {TodosService} from "../api/todos.service";
import {Subject, switchMap, tap} from "rxjs";
import {Todo} from "../models/todo.model";

@Injectable({
  providedIn: 'root'
})
export class QueryTodosService {

  private todosService = inject(TodosService);
  private useQuery = inject(UseQuery);
  private queryClient = inject(QueryClientService);
  private useMutation = inject(UseMutation);

  private activeId$$: Subject<number> = new Subject<number>();

  getTodos() {
    return this.useQuery(['todos'], () => this.todosService.getTodos()).result$;
  }

  getActiveTodo() {
    return this.activeId$$.pipe(switchMap(id => this.useQuery(['todo', id], () => this.todosService.getTodo(1)).result$));
  }

  refresh() {
    this.queryClient.invalidateQueries(['todos'])
  }

  setActiveId(id: number) {
    this.activeId$$.next(id);
  }

  // returns new fn with mutate
  addTodo() {
    return this.useMutation((todo: Todo) => {
      return this.todosService.addTodo(todo).pipe(tap((newTodo) => {
        this.queryClient.invalidateQueries(['todos']);
      }));
    });
  }

  //
  addTodo2(todo: Todo) {
    return this.todosService.addTodo(todo).subscribe(() => {
      this.queryClient.invalidateQueries(['todos']);
    });
  }
}
