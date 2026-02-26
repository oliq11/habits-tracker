# Habits Tracker

Aplikacja do śledzenia nawyków, stworzona w celu porównania dwóch technologii backendowych (Express i Flask) przy współpracy z frontendem w Angularze.

## O Projekcie
Projekt składa się z nowoczesnego frontendu oraz dwóch alternatywnych serwerów API. Oba backendy (Express oraz Flask) realizują te same zadania, co pozwala na analizę różnic w budowie i działaniu aplikacji w środowiskach Node.js oraz Python.

### Główne technologie:
* **Frontend:** Angular 
* **Backend A:** Node.js + Express.js
* **Backend B:** Python + Flask
* **Baza danych:** MySQL

---

## Struktura folderów
* `/client` – Aplikacja kliencka w Angularze.
* `/server_express` – API zbudowane w Express.js.
* `/server_flask` – API zbudowane we Flasku.
* `habits.sql` – Gotowy schemat bazy danych MySQL.

---

## Instrukcja uruchomienia

### 1. Baza danych
1. Upewnij się, że masz zainstalowany serwer MySQL (np. XAMPP).
2. Stwórz nową bazę danych.
3. Zaimportuj plik `habits.sql`, aby utworzyć niezbędne tabele.

### 2. Wybór Backend'u

## Ważne: Konfiguracja Portów w Angularze
Pamiętaj, aby przed uruchomieniem aplikacji klienckiej ustawić poprawny port API w pliku `client\projekt\src\app\habit.service.ts`:

| Backend | Port | Adres URL w Angularze |
| :--- | :--- | :--- |
| **Express.js** | 3000 | `http://localhost:3000` |
| **Flask** | 4000 | `http://localhost:4000` |

*Błąd połączenia (Connection Refused) zazwyczaj oznacza, że Angular próbuje połączyć się z niewłaściwym portem.*

#### Opcja: Express.js (Node.js)
```bash
cd server_express
npm install
npm start
```

#### Opcja: Flask (Python)
```bash
cd server_flask
# Opcjonalnie stwórz venv: python -m venv venv
pip install -r requirements.txt
python app.py
```

### 3. Frontend (Angular)
```bash
cd client/projekt
npm install
ng serve
```
---
Aplikacja będzie dostępna pod adresem: http://localhost:3001

### Funkcjonalności
- Dodawanie nowych nawyków do śledzenia.

- Oznaczanie wykonania zadania w danym dniu.

- Przeglądanie listy nawyków pobieranych z bazy danych.

- Możliwość płynnego przełączania między backendem Python a Node.js (poprzez zmianę portu API).

### Autor
Projekt wykonany w ramach zajęć przez Oliwia Spaleniak.
