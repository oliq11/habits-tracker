import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista.html'
})
export class Lista {
  @Input() dane: any[] = [];
  @Output() zmiana = new EventEmitter<void>();
  edytowanyId: number | null = null;
  ukonczone: boolean = false;

  constructor(private api: HabitService) { }

  get filteredDane(): any[] {    
    if (this.ukonczone) {
      const filtered = this.dane.filter(h => {
        const result = this.isToday(h.last_completed);
        return result;
      });
      return filtered;
    }
    return this.dane;
  }

  isToday(dateStr: string | null): boolean {
    if (!dateStr) {
      return false;
    }
    const today = new Date();
    const completedDate = new Date(dateStr);
    
    return today.toDateString() === completedDate.toDateString();
  }

  
  zrob(id: number) {
    this.api.completeHabit(id)
      .then(() => {
        this.zmiana.emit();
      })
      .catch(err => {
        if (err.response && err.response.status === 400) {
          alert("Ten nawyk został już dziś wykonany!");
        } else {
          console.error("Błąd serwera", err);
        }
      });
  }

  usun(id: number) {
    this.api.deleteHabit(id).then(() => this.zmiana.emit());
  }

  startEdit(h: any) { this.edytowanyId = h.id; }

  saveEdit(h: any) {
    this.api.updateHabit(h.id, h.name, h.description).then(() => {
      this.edytowanyId = null;
      this.zmiana.emit();
    }).catch(err => {
      console.error("Błąd podczas aktualizacji:", err);
    });
  }
}