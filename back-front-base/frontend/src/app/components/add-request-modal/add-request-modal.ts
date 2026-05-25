import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-request-modal',
  standalone: true,
  styleUrls: ['./add-request-modal.component.css'],
  imports: [CommonModule, FormsModule],
  template: `

    <div class="modal-header">

      <h4 class="modal-title">
        Aggiungi richiesta
      </h4>

    </div>

    <div class="modal-body">

      <div class="mb-3">

        <label class="form-label">
          Data inizio
        </label>

        <input
          type="date"
          class="form-control"
          [(ngModel)]="dataInizio">

      </div>

      <div class="mb-3">

        <label class="form-label">
          Data fine
        </label>

        <input
          type="date"
          class="form-control"
          [(ngModel)]="dataFine">

      </div>

      <div class="mb-3">

        <label class="form-label">
          Categoria ID
        </label>

        <input
          type="text"
          class="form-control"
          [(ngModel)]="categoriaId">

      </div>

    </div>

    <div class="modal-footer">

      <button
        type="button"
        class="btn btn-secondary"
        (click)="activeModal.dismiss()">

        Annulla

      </button>

      <button
        type="button"
        class="btn btn-primary"
        (click)="add()">

        Conferma

      </button>

    </div>
  `
})
export class AddRequestModal {

  activeModal = inject(NgbActiveModal);

  dataInizio = '';
  dataFine = '';
  categoriaId = '';

  add() {

    this.activeModal.close({

      dataInizio: this.dataInizio,
      dataFine: this.dataFine,
      categoriaId: this.categoriaId

    });
  }
}