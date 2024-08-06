import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {computed, inject} from "@angular/core";
import {BooksService} from "./books.service";
import {Book} from "./books.model";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {delay, exhaustMap, pipe, tap} from "rxjs";

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
      addBook(book: Pick<Book, 'author' | 'name'>) {
        const newBook = {
          ...book,
          id: crypto.randomUUID(),
        }
        patchState(store, { books: [...store.books(), newBook], isLoading: false })
      },
      loadBooks: rxMethod<void>(
        pipe(
          tap(() => patchState(store, ({isLoading: true}))),
          delay(1000),
          exhaustMap(() => {
            return bookService.getBooks().pipe(
              tap((books) => {
                patchState(store, { books: books, isLoading: false })
              })
            );
          })
        )
      )
    }
  })
);
