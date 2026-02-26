import { Component, signal, inject } from '@angular/core';
import { HabitService } from './habit.service';
import { Naglowek } from './naglowek/naglowek';
import { Form } from './form/form';
import { Lista } from './lista/lista';
import { Stopka } from './stopka/stopka';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Naglowek, Form, Lista, Stopka],
  templateUrl: './app.html'
})
export class App {
  api = inject(HabitService);
  habits = signal<any[]>([]); 

  auto = this.pobierz();

  pobierz() {
    this.api.getHabits().then(res => this.habits.set(res.data));
  }
}