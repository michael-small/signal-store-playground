import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {Book} from "./books.model";

@Injectable({providedIn: 'root'})
export class BooksService {
  getBooks(): Observable<Book[]> {
    return of([{id: "0b498263-caa6-4b9f-8ab6-61d9cd0ba890", name: 'Evil Guys Inc', author: 'John Doe'}]);
  }
}
