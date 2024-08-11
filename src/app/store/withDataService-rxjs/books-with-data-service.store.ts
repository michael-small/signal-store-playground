import {signalStore, type} from '@ngrx/signals';
import {BooksWithDataService} from "./books-with-data-service.service";
import {withEntities} from "@ngrx/signals/entities";
import {withCallState} from "./with-call-state";
import {Book} from "../books.model";
import {withDataService} from "./with-data-service";

export const BooksWithDataServiceStore = signalStore(
  {providedIn: 'root'},
  withCallState({
    collection: 'book'
  }),
  withEntities({
    entity: type<Book>(),
    collection: 'book'
  }),
  withDataService({
    dataServiceType: BooksWithDataService,
    filter: { }, // Ignore this, I may pull it out
    collection: 'book'
  }),
);
