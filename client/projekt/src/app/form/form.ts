import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HabitService } from '../habit.service';

@Component({
  selector: 'app-form',
  imports: [FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
habit = { name: '', desc: '' };
  @Output() naDodanie = new EventEmitter<void>();

  constructor(private api: HabitService) {}

  add() {
    if (!this.habit.name) return;
    this.api.addHabit(this.habit.name, this.habit.desc).then(() => {
      this.habit = { name: '', desc: '' };
      this.naDodanie.emit();
    });
  }
}
