import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Assignment } from './assignment.entity';



@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  protected http = inject(HttpClient);

  list(classroomId:string) {
    return this.http.get<Assignment[]>(`/api/classrooms/${classroomId}/assignments`);
  }

  check(classroomId:string,id:string) {
    return this.http.patch<Assignment>(`/api/classrooms/${classroomId}/assignments/${id}`,{});
  }

  add(title:string,classroomId:string){
    return this.http.post<Assignment>(`/api/classrooms/${classroomId}/assignments`,{title});
  }
}
