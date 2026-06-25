// src/archive/persistence/indexedDb.ts
import { openDB, DBSchema, IDBPDatabase } from "idb";

interface ArchiveDB extends DBSchema {
  history: { key: string; value: any };
  incidents: { key: string; value: any };
  events: { key: string; value: any };
}

let dbPromise: Promise<IDBPDatabase<ArchiveDB>> | null = null;

export const IndexedDB = {
  async getDB() {
    if (!dbPromise) {
      dbPromise = openDB<ArchiveDB>("archive-db", 1, {
        upgrade(db) {
          db.createObjectStore("history");
          db.createObjectStore("incidents");
          db.createObjectStore("events");
        },
      });
    }
    return dbPromise;
  },
  async saveIncident(slug: string, data: any) {
    const db = await this.getDB();
    await db.put("incidents", data, slug);
  },
  async getIncident(slug: string) {
    const db = await this.getDB();
    return db.get("incidents", slug);
  },
  async saveEvent(id: string, data: any) {
    const db = await this.getDB();
    await db.put("events", data, id);
  },
  async getAllEvents() {
    const db = await this.getDB();
    return db.getAll("events");
  },
};
