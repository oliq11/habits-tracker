import { akcje } from "./akcje.js";
import { Router } from "express";

const router = Router();

// GET Wszystkie nawyki
router.get('/api/habits', akcje.findAllHabits);

// POST Nowy nawyk z opisem
router.post('/api/habits', akcje.createNewHabit);

// PUT Edycja nazwy i opisu
router.put('/api/habits/:id', akcje.updateHabit);

// PUT Odhaczenie (streak)
router.put('/api/habits/:id/complete', akcje.completeHabit);

// DELETE 
router.delete('/api/habits/:id', akcje.deleteHabit);

export { router };