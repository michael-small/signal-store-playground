import {inject, Injectable} from '@angular/core';
import {Book} from "./books.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DataService} from "./features/with-data-service";
import { EntityId } from '@ngrx/signals/entities';
import {catchError, Observable, of} from "rxjs";

export type BookFilter = {
  from: string;
  to: string;
}
@Injectable({providedIn: 'root'})
export class BooksWithDataService implements DataService<Book, BookFilter>{
  private url = 'http://localhost:3000/books';
  private http = inject(HttpClient);

  loadById(id: EntityId): Observable<Book> {
    const reqObj = { params: new HttpParams().set('id', id) };
    return this.http.get<Book>(this.url, reqObj).pipe(
      catchError(_ => of<Book>())
    );
  }

  create(entity: Book): Observable<Book> {
    return this.http.post<Book>(this.url, entity).pipe(
      catchError(_ => of<Book>())
    )
  }

  update(entity: Book): Observable<Book> {
    return this.http.post<Book>(this.url, entity).pipe(
      catchError(_ => of<Book>())
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAll(entity: Book[]): Observable<Book[]> {
    throw new Error('updateAll method not implemented.');
  }

  delete(entity: Book): Observable<void> {
    return this.http.delete<void>(`${this.url}/${entity.id}`).pipe(
      catchError(_ => of<void>())
    )
  }

  load(filter: BookFilter): Observable<Book[]> {
    return this.http.get<Book[]>(this.url).pipe(
      catchError(_ => of<Book[]>([]))
    )
  }
}
