import {Component, inject, OnInit} from '@angular/core';
import {BooksStore} from "./store/books.store";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    @if ($isLoading()) {
      Loading...
    } @else {
      <pre>{{ $books() | json }}</pre>
    }
  `,
  imports: [
    JsonPipe
  ],
  providers: [BooksStore]
})
export class AppComponent implements OnInit {
  store = inject(BooksStore);
  $isLoading = this.store.isLoading;
  $books = this.store.books;

  ngOnInit() {
    this.store.loadBooks();
  }
}
