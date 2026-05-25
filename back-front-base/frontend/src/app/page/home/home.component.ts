import { Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { CategoryService } from '../../service/category.service';
import { RequestService } from '../../service/request.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal';
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


   request$ = this.authSrv.isAuthenticated$.pipe(

    switchMap(isAuth => {

      if (!isAuth) return of([]);

      return this.refresh$.pipe(

        switchMap(() =>
          this.requestService.list().pipe(

            catchError(err => {
              console.error(err);
              return of([]);
            })

          )
        )

      );
    })
  );

  openAdd() {

    const modalRef = this.modalService.open(AddRequestModal);

    modalRef.result.then((result) => {

      this.requestService.add(result).subscribe(() => {

        this.refresh$.next();

      });

    }).catch(() => {});
  }
}