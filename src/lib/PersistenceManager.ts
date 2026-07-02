

// src/lib/PersistenceManager.ts
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { useArchiveStore } from './state';



interface ArchiveDB extends DBSchema {
  history: {
    key: string; // e.g., 'visitCount'
    value: any;
  };
  incidents: {
    key: string; // incident slug
    value: any; // incident object
  };
  events: {
    key: string; // event id
    value: any;
  };
}

let dbPromise: Promise<IDBPDatabase<ArchiveDB>> | null = null;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<ArchiveDB>('archive-db', 1, {
      upgrade(db) {
        db.createObjectStore('history');
        db.createObjectStore('incidents');
        db.createObjectStore('events');
      },
    });
  }
  return dbPromise;
};

export const PersistenceManager = {
  // LocalStorage for simple scalar values
  saveLocal: () => {
    const state = useArchiveStore.getState();
    const simple = {
      degradationLevel: state.degradationLevel,
      visitCount: state.visitCount,
      incidentCount: state.incidentCount,
      archiveHealth: state.archiveHealth,
      memoryIntegrity: state.memoryIntegrity,
      favoriteSection: state.favoriteSection,
      lastVisitedPage: state.lastVisitedPage,
      totalTimeSpent: state.totalTimeSpent,
      archiveMetrics: {
        idleEvents: state.archiveMetrics.idleEvents,
        panicEvents: state.archiveMetrics.panicEvents,
        lettersSent: state.archiveMetrics.lettersSent,
        rareEventsSeen: state.archiveMetrics.rareEventsSeen,
        totalVisits: state.archiveMetrics.totalVisits,
        pagesVisited: state.archiveMetrics.pagesVisited,
      },
    };
    localStorage.setItem('archiveState', JSON.stringify(simple));
  },
  loadLocal: () => {
    const raw = localStorage.getItem('archiveState');
    if (!raw) return;
    const data = JSON.parse(raw);
    const set = useArchiveStore.setState;
    set({
      degradationLevel: data.degradationLevel ?? 0,
      visitCount: data.visitCount ?? 0,
      incidentCount: data.incidentCount ?? 0,
      archiveHealth: data.archiveHealth ?? 100,
      memoryIntegrity: data.memoryIntegrity ?? 100,
      favoriteSection: data.favoriteSection,
      lastVisitedPage: data.lastVisitedPage,
      totalTimeSpent: data.totalTimeSpent ?? 0,
      archiveMetrics: {
        ...useArchiveStore.getState().archiveMetrics,
        idleEvents: data.archiveMetrics?.idleEvents ?? 0,
        panicEvents: data.archiveMetrics?.panicEvents ?? 0,
        lettersSent: data.archiveMetrics?.lettersSent ?? 0,
        rareEventsSeen: data.archiveMetrics?.rareEventsSeen ?? 0,
        totalVisits: data.archiveMetrics?.totalVisits ?? 0,
        pagesVisited: data.archiveMetrics?.pagesVisited ?? {},
      },
    });
  },
  // IndexedDB for complex collections
  async saveIncident(slug: string, incident: any) {
    const db = await getDB();
    await db.put('incidents', incident, slug);
  },
  async getIncident(slug: string) {
    const db = await getDB();
    return await db.get('incidents', slug);
  },
  async saveEvent(id: string, event: any) {
    const db = await getDB();
    await db.put('events', event, id);
  },
  async getAllEvents() {
    const db = await getDB();
    return await db.getAll('events');
  },
  // Call on app start to hydrate store
  initialize: () => {
    PersistenceManager.loadLocal();
  },
};
