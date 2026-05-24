import { Component, inject } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  protected categoryService = inject(CategoryService);
  protected authSrv = inject(AuthService);

  categories$ = this.authSrv.isAuthenticated$.pipe(
    switchMap(isAuth => {
      if (!isAuth) return of([]);

      return this.categoryService.list();
    })
  );
}