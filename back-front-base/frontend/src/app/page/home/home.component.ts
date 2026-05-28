import { Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap, combineLatest } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { RequestService } from '../../service/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddRequestModal } from '../../components/add-request-modal/add-request-modal';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  protected requestService = inject(RequestService);
  protected authSrv = inject(AuthService);
  private modalService = inject(NgbModal);

  refresh$ = new BehaviorSubject<void>(undefined);

  // 👇 user stream separato
  user$ = this.authSrv.currentUser$.pipe(
    switchMap(user => of(user))
  );

  // 👇 ruoli enterprise
  isRole1$ = this.user$.pipe(
    switchMap(user => of(user?.role === 'role1'))
  );

  isRole2$ = this.user$.pipe(
    switchMap(user => of(user?.role === 'role2'))
  );

  // 👇 requests stream reattivo
  request$ = combineLatest([
    this.authSrv.isAuthenticated$,
    this.refresh$
  ]).pipe(
    switchMap(([isAuth]) => {

      if (!isAuth) return of([]);

      return this.requestService.list().pipe(
        catchError(err => {
          console.error(err);
          return of([]);
        })
      );
    })
  );

  openAdd() {
    const modalRef = this.modalService.open(AddRequestModal);

    modalRef.result.then(result => {
      this.requestService.add(result).subscribe(() => {
        this.refresh$.next();
      });
    }).catch(() => {});
  }

  deleteRequest(id: string) {
    if (!confirm('Vuoi eliminare questa richiesta?')) return;

    this.requestService.delete(id).subscribe(() => {
      this.refresh$.next();
    });
  }

  approveRequest(id: string) {
    this.requestService.approveRequest(id).subscribe(() => {
      this.refresh$.next();
    });
  }

  rejectRequest(id: string) {
    this.requestService.rejectRequest(id).subscribe(() => {
      this.refresh$.next();
    });
  }

  editRequest(request: any) {
    const modalRef = this.modalService.open(AddRequestModal);

    modalRef.componentInstance.dataInizio = request.dataInizio;
    modalRef.componentInstance.dataFine = request.dataFine;
    modalRef.componentInstance.categoriaId = request.categoriaId;

    modalRef.result.then(result => {
      this.requestService.update(request.id, result).subscribe(() => {
        this.refresh$.next();
      });
    }).catch(() => {});
  }
}