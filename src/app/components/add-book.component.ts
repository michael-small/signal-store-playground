import {Component, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Book} from "../store/books.model";

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #bookForm="ngForm">
      <label for="author">Author</label>
      <input name="author" [(ngModel)]="$author" required />

      <label for="name">Name</label>
      <input name="name" [(ngModel)]="$name" required />

      <button (click)="submitBook()" [disabled]="bookForm.invalid">submit</button>
    </form>
  `,
  styles: ``
})
export class AddBookComponent {
  $author = signal('')
  $name = signal('')

  submit = output<Book>()

  submitBook() {
    this.submit.emit({id: crypto.randomUUID(), name: this.$name(), author: this.$author()})
  }
}
