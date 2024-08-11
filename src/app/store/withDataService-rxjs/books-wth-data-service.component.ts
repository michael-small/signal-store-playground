import {Component, effect, inject, OnInit} from '@angular/core';
import {JsonPipe} from "@angular/common";
import {AddBookComponent} from "../../components/add-book.component";
import {Book} from "../books.model";
import {BooksWithDataServiceStore} from "./books-with-data-service.store";

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
  booksWithDataStore = inject(BooksWithDataServiceStore);
  $books = this.booksWithDataStore.bookEntities;
  ngOnInit() {
    this.booksWithDataStore.loadBookEntities();
  }
  addBook(book: Book) {
    this.booksWithDataStore.createBook({id: crypto.randomUUID(), author: 'jerry', name: 'hey'})
  }

  deleteBook(book: Book) {
    this.booksWithDataStore.deleteBook(book);
  }
}
