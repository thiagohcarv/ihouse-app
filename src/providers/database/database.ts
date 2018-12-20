import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class DatabaseProvider {
  constructor(private db: AngularFireDatabase) { }

  // CATEGORIES
  getCategories<T>(): Observable<T[]> {
    return this.db.list<T>("category").valueChanges();
  }

  // MESSAGES
  createMessage<T>(message: T): void {
    this.db.list<T>(`messages/`).push(message);
  }
  getMessages<T>(id: string): Observable<T[]> {
    return this.db.list<T>("messages", (ref) =>
      ref.orderByChild('user/id').equalTo(id)
    ).valueChanges();
  }

  // USER
  createUser<T>(path: string, user: T): void {
    this.db.object<T>(path).set(user);
  }
  updateUser<T>(id: string, params: any): Promise<void> {
    const ref = this.db.object<T>(`user/${id}`);
    return ref.update(params);
  }

  // JOB
  createJob<T>(job: T): void {
    this.db.list<T>(`jobs/`).push(job);
  }
  getJobsByEmployer<T>(id: string): Observable<T[]> {
    return this.db.list<T>("/jobs", (ref) =>
      ref.orderByChild('employerID').equalTo(id)
    ).valueChanges();
  }
  getJobsByEmployee<T>(id: string): Observable<T[]> {
    return this.db.list<T>("/jobs", (ref) =>
      ref.orderByChild('employee/id').equalTo(id)
    ).valueChanges();
  }
  getJobs<T>(): Observable<T[]> {
    return this.db.list<T>("jobs").valueChanges();
  }
  updateJob<T>(id: string, params: any): Promise<void> {
    const ref = this.db.object<T>(`jobs/${id}`);
    return ref.update(params);
  }
  getJobsByCategory<T>(categoryID: number): Observable<T[]> {
    return this.db.list<T>("/jobs", (ref) =>
      ref.orderByChild('category/id').equalTo(categoryID)
    ).valueChanges();
  }

  // Employee
  getUserByID<T>(id: string): Observable<T> {
    return this.db.object<T>(`user/${id}`).valueChanges();
  }
  getEmployees<T>(): Observable<T[]> {
    return this.db.list<T>("user", (res) =>
      res.orderByChild('type').equalTo('employee')
    ).valueChanges();
  }
  getUserBySSN<T>(ssn: string): Observable<T[]>{
    return this.db.list<T>('user', (res) =>
      res.orderByChild('ssn').equalTo(ssn)
    ).valueChanges();
  }
  getEmployeeByID<T>(id: string): Observable<T> {
    return this.db.object<T>(`user/${id}`).valueChanges();
  }

  // Employer
  getEmployers<T>(): Observable<T[]> {
    return this.db.list<T>("user").valueChanges();
  }
  getEmployerByID<T>(id: string): Observable<T> {
    return this.db.object<T>(`user/${id}`).valueChanges();
  }
}
