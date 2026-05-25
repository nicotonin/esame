import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Request } from './request.entity';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  protected http = inject(HttpClient);

  list() {
    return this.http.get<Request[]>(`${environment.apiUrl}/requests/getAllRequests`);
  }

  add(request:Partial<Request>) {
    return this.http.post<Request>(`${environment.apiUrl}/requests/createRequest`, request);
  }

  
}
