import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from "@angular/core";
import {BooksService} from "./books.service";
import {Book} from "./books.model";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {delay, exhaustMap, pipe, switchMap, tap} from "rxjs";
import {tapResponse} from "@ngrx/operators";
import {HttpErrorResponse} from "@angular/common/http";

type BooksState = {
  books: Book[];
  isLoading: boolean;
};

const initialState: BooksState = {
  books: [],
  isLoading: false,
};

export const BooksStore = signalStore(
  withState({...initialState, _privateThing: 0}),
  withComputed((store) => {
      // Computed helpers for computed that are not exported
      const booksLength = computed(() => store.books().length)
      return {
        noBooks: computed(() => booksLength() === 0)
      }
    }
  ),
  withMethods((store, bookService = inject(BooksService)) => {
    // Helpers here, using const functions
    const capitalize = (str: string) => (str.toUpperCase())
    return {
      addBook: rxMethod<Book>(
        pipe(
          exhaustMap((book) => {
            return bookService.addBook(book).pipe(
              tapResponse({
                next: (books) => patchState(store, { books: books, isLoading: false }),
                error: (error: HttpErrorResponse) => console.log('error'),
                }
              )
            );
          })
        )
      ),
      loadBooks: rxMethod<void>(
        pipe(
          tap(() => patchState(store, ({isLoading: true}))),
          delay(1000),
          exhaustMap(() => {
            console.log('hit load')
            return bookService.getBooks().pipe(
              tapResponse(
                (books) => patchState(store, { books: books, isLoading: false }),
                (error: HttpErrorResponse) => console.log('error'),
              )
            );
          })
        )
      )
    }
  })
);
