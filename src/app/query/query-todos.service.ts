import {inject, Injectable} from '@angular/core';
import {QueryClientService, UseQuery} from "@ngneat/query";
import {TodosService} from "../api/todos.service";
import {Subject, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QueryTodosService {

  private todosService = inject(TodosService);
  private useQuery = inject(UseQuery);
  private queryClient = inject(QueryClientService);

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
}
