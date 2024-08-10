import {Component, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Book} from "../store/books.model";

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form #bookForm="ngForm">
      <span class="form-field">
        <label for="author">Author</label>
        <input name="author" [(ngModel)]="$author" required/>
      </span>

      <span class="form-field">
        <label for="name">Name</label>
        <input name="name" [(ngModel)]="$name" required/>
      </span>

      <button (click)="submitBook()" [disabled]="bookForm.invalid">Add Book</button>
    </form>
  `,
  styles: `
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 40%;
    }
    .form-field {
      display: flex;
      flex-direction: column;
    }
  `
})
export class AddBookComponent {
  $author = signal('');
  $name = signal('');

  submit = output<Book>();

  submitBook() {
    this.submit.emit({id: crypto.randomUUID(), name: this.$name(), author: this.$author()});
    this.$author.set('')
    this.$name.set('')
  }
}
