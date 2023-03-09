import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../models/todo.model";
import {delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private http = inject(HttpClient);

  getTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(delay(1000));
  }

  getTodo(id: number) {
    return this.http.get<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`).pipe(delay(1000));
  }

}
