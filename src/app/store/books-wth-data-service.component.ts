import {Component, effect, inject, OnInit} from '@angular/core';
import {BooksStore} from "./books.store";

@Component({
  selector: 'app-books-with-data',
  standalone: true,
  template: `withDataService`
})

export class BooksWithDataComponent implements OnInit {
  booksWithDataStore = inject(BooksStore);
  ngOnInit() {
    this.booksWithDataStore.loadBooks();
  }
  booksLoad = effect(() => {
    console.log(this.booksWithDataStore.books());
  })
}
