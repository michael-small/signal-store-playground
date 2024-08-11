import {Component, inject, OnInit, Signal} from '@angular/core';
import {BooksStore} from "./store/books.store";
import {JsonPipe} from "@angular/common";
import {Book} from "./store/books.model";
import {AddBookComponent} from "./components/add-book.component";
import {BooksWithDataComponent} from "./store/books-wth-data-service.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-add-book (submit)="store.addBook($event)" />

    @if (store.isPending()) {
      <p>Loading...</p>
    } @else if (store.isFulfilled()) {
      @for (book of $books(); track $index) {
        <pre>{{ book | json }}: <button (click)="deleteBook(book)">delete</button></pre>
      } @empty {
        <p>No books</p>
      }
    } @else if (store.error()) {
      <pre>d{{store.error()}}</pre>
    }
    <app-books-with-data />
  `,
  imports: [
    JsonPipe, AddBookComponent, BooksWithDataComponent
  ],
  providers: [BooksStore]
})
export class AppComponent implements OnInit {
  store = inject(BooksStore);
  $books: Signal<Book[]> = this.store.books;

  ngOnInit() {
    this.store.loadBooks();
  }

  addBook() {
    this.store.addBook({id: crypto.randomUUID(), author: 'jerry', name: 'hey'}).unsubscribe()
  }

  deleteBook(book: Book) {
    this.store.deleteBook(book);
  }
}
