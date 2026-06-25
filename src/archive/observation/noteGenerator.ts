// src/archive/observation/noteGenerator.ts
/**
 * Generates observation notes for different categories.
 * Each function returns a string that can be stored in the observation history.
 */
export const NoteGenerator = {
  idle(seconds: number) {
    return `You remained inactive for ${seconds} seconds.`;
  },
  hover(element: string) {
    return `Your cursor lingered over ${element}.`;
  },
  repeat_visit(page: string, count: number) {
    return count > 1 ? `Third visit.` : `You keep returning here.`;
  },
  favorite_section(section: string) {
    return `This page appears important to you.`;
  },
  panic() {
    return `Panic detected – the archive feels unstable.`;
  },
  archive_health(health: number) {
    return health < 30 ? `Archive integrity declining.` : `Archive health is stable.`;
  },
  memory_integrity(integrity: number) {
    return integrity < 50 ? `Memory reconstruction stalled.` : `Memory is intact.`;
  },
};
