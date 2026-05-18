import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Classroom } from './classroom.entity';
import { User } from '../entities/user.entity';



@Injectable({
  providedIn: 'root'
})
export class ClassroomService {
  protected http = inject(HttpClient);

  list() {
    return this.http.get<Classroom[]>('/api/classrooms');
  }

  add(name:string, student:string) {
    return this.http.post<Classroom>(`/api/classrooms`,{name,student});
  }
}
