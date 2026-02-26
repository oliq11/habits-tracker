import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HabitService {
  private port = 4000; // zmiana portu serwera

  private get baseUrl() {
    return `http://localhost:${this.port}/api/habits`;
  }

  getHabits() {
    return axios.get(this.baseUrl);
  }

  addHabit(name: string, description: string) {
    return axios.post(this.baseUrl, { name, description });
  }

  updateHabit(id: number, name: string, description: string) {
    return axios.put(`${this.baseUrl}/${id}`, { name, description });
  }

  completeHabit(id: number) {
    return axios.put(`${this.baseUrl}/${id}/complete`);
  }

  deleteHabit(id: number) {
    return axios.delete(`${this.baseUrl}/${id}`);
  }
}