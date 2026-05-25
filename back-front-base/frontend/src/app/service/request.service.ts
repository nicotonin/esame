import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Request } from './request.entity';



@Injectable({
  providedIn: 'root'
})
export class RequestService {
  protected http = inject(HttpClient);

  list() {
    return this.http.get<Request[]>(`/api/requests/getAllRequests`);
  }

  add(request:Partial<Request>) {
    return this.http.post<Request>(`/api/requests/createRequest`, request);
  }

  
}
