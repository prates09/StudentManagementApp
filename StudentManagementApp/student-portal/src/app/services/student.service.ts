
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StudentService {
  private baseUrl = 'http://localhost:5127/api/Students';

  constructor(private http: HttpClient) {}

  getAuthHeader() {
    
    const token =
      typeof window !== 'undefined' ? (localStorage.getItem('token') || '') : '';

    return {
      headers: { Authorization: `Bearer ${token}` }
    };
  }

  getStudents() {
    return this.http.get<any[]>(this.baseUrl, this.getAuthHeader());
  }

  addStudent(student: any) {
    return this.http.post<any>(this.baseUrl, student, this.getAuthHeader());
  }

  editStudent(id: number, student: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, student, this.getAuthHeader());
  }

  deleteStudent(id: number) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.getAuthHeader());
  }

  getStudentById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, this.getAuthHeader());
  }
}
