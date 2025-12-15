

import { Component, Inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { StudentService } from '../../services/student.service';

@Component({
  standalone: true,
  selector: 'app-students',
  templateUrl: './students.html',
  styleUrls: ['./students.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class StudentsComponent implements OnInit {
  students: any[] = [];

  id: number | null = null;
  name = '';
  classValue = '';
  section = '';
  isEdit = false;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private showAlert(msg: string) {
    if (this.isBrowser()) window.alert(msg);
  }

  private showConfirm(msg: string): boolean {
    return this.isBrowser() ? window.confirm(msg) : false;
  }

  ngOnInit(): void {
    if (!this.isBrowser()) return;

    const token = localStorage.getItem('token') || '';
    if (!token) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (res: any[]) => {
        console.log('Students from API:', res);
        this.students = res || [];

        // ✅ force UI update (important for zoneless/SSR)
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);

        if (err?.status === 401) {
          localStorage.removeItem('token');
          this.router.navigateByUrl('/login');
          return;
        }

        this.showAlert('Failed to load students');
      },
    });
  }

  clearForm() {
    this.id = null;
    this.name = '';
    this.classValue = '';
    this.section = '';
    this.isEdit = false;
  }

  editStudent(s: any) {
    this.isEdit = true;
    this.id = s.id;
    this.name = s.name;
    this.classValue = s.class;
    this.section = s.section;

    this.cdr.detectChanges();
  }

  saveStudent() {
    if (!this.name || !this.classValue || !this.section) {
      this.showAlert('Please fill Name, Class, Section');
      return;
    }

    if (this.isEdit && this.id != null) {
      const payload = {
        id: this.id,
        name: this.name,
        class: this.classValue,
        section: this.section,
      };

      this.studentService.editStudent(this.id, payload).subscribe({
        next: () => {
          // ✅ update UI instantly
          const idx = this.students.findIndex(x => x.id === this.id);
          if (idx !== -1) this.students[idx] = payload;

          this.clearForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this.showAlert('Update failed');
        },
      });
    } else {
      const addPayload = {
        name: this.name,
        class: this.classValue,
        section: this.section,
      };

      this.studentService.addStudent(addPayload).subscribe({
        next: (created) => {
          // ✅ if API returns created object, push it; else reload
          if (created && created.id) this.students.push(created);
          else this.loadStudents();

          this.clearForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.log(err);
          this.showAlert('Add failed');
        },
      });
    }
  }

  deleteStudent(id: number) {
    if (!id) return;
    if (!this.showConfirm('Delete this student?')) return;

    this.studentService.deleteStudent(id).subscribe({
      next: () => {
        this.students = this.students.filter(x => x.id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.showAlert('Delete failed');
      },
    });
  }
}
