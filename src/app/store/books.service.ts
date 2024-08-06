import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Book} from "./books.model";

@Injectable({providedIn: 'root'})
export class BooksService {
  private _books = new BehaviorSubject<Book[]>([{id: "0b498263-caa6-4b9f-8ab6-61d9cd0ba890", name: 'Evil Guys Inc', author: 'John Doe'}]);
  public books = this._books.asObservable();

  addBook(book: Book) {
    const newBooks = [...this._books.getValue(), book]
    this._books.next(newBooks);

    // NOTE - When not doing HTTP, can't just return the public "books" since it does not complete. Need to do this in
    //            an `of` so it can complete with `exhaustMap`.
    return of(this._books.getValue())
  }

  getBooks(): Observable<Book[]> {
    return this.books;
  }
}
