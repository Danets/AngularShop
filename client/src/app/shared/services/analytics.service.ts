import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Overview } from './../models/analytics';

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverview(): Observable<Overview> {
    return this.http.get<Overview>('/api/analytics/overview');
  }

}
