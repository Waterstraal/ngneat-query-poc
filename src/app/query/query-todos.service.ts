import {inject, Injectable} from '@angular/core';
import {UseQuery} from "@ngneat/query";
import {TodosService} from "../api/todos.service";

@Injectable({
  providedIn: 'root'
})
export class QueryTodosService {

  private todosService = inject(TodosService);
  private useQuery = inject(UseQuery);

  getTodos() {
    return this.useQuery(['todos'], () => {
      return this.todosService.getTodos()
    });
  }
}
