const STORAGE_KEY = 'habit-tracker-data';

export function loadState() {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (serialized === null) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.error('Errore nel caricamento dello stato', err);
    return undefined;
  }
}

export function saveState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error('Errore nel salvataggio dello stato', err);
  }
}