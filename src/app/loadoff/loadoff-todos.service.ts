import {inject, Injectable} from '@angular/core';
import {toAsyncState} from "@ngneat/loadoff";
import {TodosService} from "../api/todos.service";

@Injectable({
  providedIn: 'root'
})
export class LoadoffTodosService {
  private todosService = inject(TodosService);

  getTodos() {
    return this.todosService.getTodos().pipe(toAsyncState());
  }
}
