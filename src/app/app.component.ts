import {Component, inject, OnInit, Signal} from '@angular/core';
import {BooksStore} from "./store/books.store";
import {JsonPipe} from "@angular/common";
import {Book} from "./store/books.model";
import {AddBookComponent} from "./components/add-book.component";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    @if ($isLoading()) {
      <p>Loading...</p>
    } @else {
      @for (book of $books(); track $index) {
        <pre>{{ book | json }}: <button (click)="deleteBook(book)">delete</button></pre>
      } @empty {
        <p>No books</p>
      }
    }
    <app-add-book (submit)="store.addBook($event)" />
  `,
  imports: [
    JsonPipe, AddBookComponent
  ],
  providers: [BooksStore]
})
export class AppComponent implements OnInit {
  store = inject(BooksStore);
  $isLoading: Signal<boolean> = this.store.isLoading;
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
