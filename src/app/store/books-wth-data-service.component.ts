import {Component, effect, inject, OnInit} from '@angular/core';
import {BooksStore} from "./books.store";
import {Book} from "./books.model";
import {AddBookComponent} from "../components/add-book.component";
import {JsonPipe} from "@angular/common";

@Component({
  selector: 'app-books-with-data',
  standalone: true,
  imports: [
    AddBookComponent,
    JsonPipe
  ],
  template: `
    <app-add-book (submit)="addBook($event)" />

    @for (book of $books(); track $index) {
      <pre>{{ book | json }}: <button (click)="deleteBook(book)">delete</button></pre>
    } @empty {
      <p>No books</p>
    }
  `
})

export class BooksWithDataComponent implements OnInit {
  booksWithDataStore = inject(BooksStore);
  $books = this.booksWithDataStore.books;
  ngOnInit() {
    this.booksWithDataStore.loadBooks();
  }

  addBook(book: Book) {
    this.booksWithDataStore.addBook({id: crypto.randomUUID(), author: 'jerry', name: 'hey'}).unsubscribe()
  }

  deleteBook(book: Book) {
    this.booksWithDataStore.deleteBook(book);
  }
}
