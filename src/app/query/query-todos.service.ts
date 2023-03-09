import {inject, Injectable} from '@angular/core';
import {QueryClientService, UseQuery} from "@ngneat/query";
import {TodosService} from "../api/todos.service";

@Injectable({
  providedIn: 'root'
})
export class QueryTodosService {

  private todosService = inject(TodosService);
  private useQuery = inject(UseQuery);
  private queryClient = inject(QueryClientService);

  getTodos() {
    return this.useQuery(['todos'], () => this.todosService.getTodos());
  }

  refresh() {
    this.queryClient.invalidateQueries(['todos'])
  }
}
