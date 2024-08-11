import {signalStore, type} from '@ngrx/signals';
import {Book} from "./books.model";
import {withDataService} from "./features/with-data-service";
import {BooksWithDataService} from "./books-with-data-service.service";
import {withEntities} from "@ngrx/signals/entities";
import {withCallState} from "./features/with-call-state";

export const BooksStore = signalStore(
  withCallState({
    collection: 'book'
  }),
  withEntities({
    entity: type<Book>(),
    collection: 'book'
  }),
  withDataService({
    dataServiceType: BooksWithDataService,
    // Don't have much of a use for a filter at the moment, just going to let this stay in
    //     to signify I didn't do so lol
    filter: { from: 'Paris', to: 'New York' },
    collection: 'book'
  }),
);
