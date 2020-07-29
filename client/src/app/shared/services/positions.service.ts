import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '../models/position';
import { Message } from '../models/categoty';

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

  updatePosition(position: Position): Observable<Position> {
    return this.http.patch<Position>(`/api/position/${position._id}`, position);
  }

  deletePosition(id: string): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${id}`);
  }
}
