import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from "@angular/core";
import {BooksService} from "./books.service";
import {Book} from "./books.model";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {delay, exhaustMap, pipe, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {HttpErrorResponse} from "@angular/common/http";
import {setError, setFulfilled, setPending, withRequestStatus} from "./features/request-status.feature";
import {withLogger} from "./features/logger.feature";

type BooksState = {
  books: Book[];
};

const initialState: BooksState = {
  books: [],
};

export const BooksStore = signalStore(
  withState({...initialState}),
  withRequestStatus(),
  withComputed((store) => {
      const booksLength = computed(() => store.books().length)
      return {
        noBooks: computed(() => booksLength() === 0)
      }
    }
  ),
  withLogger('books'),
  withMethods((store, bookService = inject(BooksService)) => {
    // Helpers here, using const functions
    return {
      addBook: rxMethod<Book>(
        pipe(
          tap(() => patchState(store, setPending())),
          exhaustMap((book) => {
            return bookService.addBook(book).pipe(
              tapResponse({
                next: (books) => patchState(store, { books: [...store.books(), book] }, setFulfilled()),
                error: (error: HttpErrorResponse) => setError(error.message),
                }
              )
            );
          })
        )
      ),
      deleteBook: rxMethod<Book>(
        pipe(
          tap(() => patchState(store, (setPending()))),
          exhaustMap((book) => {
            return bookService.deleteBook(book).pipe(
              tapResponse({
                next: (books) => patchState(store, { books: [...store.books().filter(_book => _book.id !== book.id)] }, setFulfilled()),
                error: (error: HttpErrorResponse) => setError(error.message),
              })
            )
          })
        )
      ),
      loadBooks: rxMethod<void>(
        pipe(
          tap(() => patchState(store, (setPending()))),
          delay(1000),
          exhaustMap(() => {
            console.log('hit load')
            return bookService.getBooks().pipe(
              tapResponse(
                (books) => patchState(store, { books: books }, setFulfilled()),
                (error: HttpErrorResponse) => setError(error.message),
              )
            );
          })
        )
      )
    }
  })
);
