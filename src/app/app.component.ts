import {Component, inject, OnInit} from '@angular/core';
import {BooksStore} from "./store/books.store";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
<!--    @if ($isLoading()) {-->
<!--      Loading...-->
<!--    } @else {-->
<!--      <pre>{{ $books() | json }}</pre>-->
<!--    }-->
    <pre>{{ $books() | json }}</pre>
    <button (click)="addBook()">add book</button>
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

  addBook() {
    const uuid = crypto.randomUUID()
    console.log(uuid)
    this.store.addBook({id: crypto.randomUUID(), author: 'jerry', name: 'hey'}).unsubscribe()
  }
}
