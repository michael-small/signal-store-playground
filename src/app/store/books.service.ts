import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of} from "rxjs";
import {Book} from "./books.model";
import {HttpClient} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class BooksService {
  private url = 'http://localhost:3000/books';
  private http = inject(HttpClient);

  addBook(book: Book) {
    return this.http.post<Book>(this.url, book)
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url).pipe(
      catchError(_ => of<Book[]>([]))
    )
  }
}
