import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../models/position';

@Injectable({
  providedIn: 'root',
})
export class PositionsService {
  constructor(private http: HttpClient) {}

  fetchPositions(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`);
  }

  addPosition(position: Position): Observable<Position> {
    return this.http.post<Position>('/api/position', position);
  }
  
  deletePosition(id: string): Observable<Position> {
    return this.http.delete<Position>(`/api/position/${id}`);
  }
}