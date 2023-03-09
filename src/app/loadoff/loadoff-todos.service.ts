import {inject, Injectable} from '@angular/core';
import {toAsyncState} from "@ngneat/loadoff";
import {TodosService} from "../api/todos.service";
import {BehaviorSubject, switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadoffTodosService {
  private todosService = inject(TodosService);
  private refresh$$ = new BehaviorSubject<void>(void 0)

  getTodos() {
    return  this.refresh$$.pipe(switchMap(() => this.todosService.getTodos().pipe(toAsyncState())))
  }

  refresh() {
    this.refresh$$.next();
  }
}
