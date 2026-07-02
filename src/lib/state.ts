// src/lib/state.ts
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  ObservationEntry,
  ArchiveMetrics,
  SessionInfo,
  CorruptionFlags,
  PageVisit,
  RareEventCooldown,
} from '../archive/types';

export interface DocumentData {
  id: string;
  title: string;
  content: string;
  type: 'dossier' | 'case_file' | 'note' | 'terminal';
}

export interface ArchiveState {
  // Core metrics
  degradationLevel: number; // 0.0 - 1.0
  visitCount: number;
  incidentCount: number;
  archiveHealth: number; // derived metric
  memoryIntegrity: number;
  favoriteSection?: string;
  lastVisitedPage?: string;

  // Session and persistence metrics
  totalSessions: number;
  totalTimeSpent: number; // seconds
  lastVisitTimestamp?: number; // timestamp of last page visit

  // Session runtime info (not persisted)
  session: SessionInfo; // includes sessionStart, sessionDuration, longestSession, visitStreak

  // Collections
  observationHistory: ObservationEntry[];
  archiveMetrics: ArchiveMetrics;
  corruptionFlags: CorruptionFlags;
  pageVisits: PageVisit[];
  rareEventCooldowns: Record<string, RareEventCooldown>;

  // Game Systems (Epic 1)
  inventory: string[];
  journalNotes: string[];
  mapDiscovered: boolean;
  mapAnomalyRevealed: boolean;
  memoryFragments: number;
  activeDocument: DocumentData | null;
  isAwakened: boolean;
  isBlackout: boolean;
  showSilhouette: boolean;
  isDebugMode: boolean;
  teleportTarget: [number, number, number] | null;

  // Actions
  setActiveDocument: (doc: DocumentData | null) => void;
  discoverMap: () => void;
  revealMapAnomaly: () => void;
  incrementVisit: () => void;
  incrementIncident: () => void;
  addIdleTime: (seconds: number) => void;
  addPanicEvent: () => void;
  setDegradation: (value: number) => void;
  setLastVisited: (page: string) => void;
  setFavoriteSection: (section: string) => void;
  addObservation: (entry: ObservationEntry) => void;
  recordMetric: (name: keyof ArchiveMetrics, value: number) => void;
  setSessionInfo: (info: Partial<SessionInfo>) => void;
  updateCorruptionFlags: (flags: Partial<CorruptionFlags>) => void;
  recordPageVisit: (visit: PageVisit) => void;
  incrementTotalSessions: () => void;
  addTimeSpent: (seconds: number) => void;
  setLastVisitTimestamp: (ts: number) => void;
  reset: () => void;

  // Game Actions (Epic 1)
  addInventoryItem: (item: string) => void;
  addJournalNote: (note: string) => void;
  setMapDiscovered: (discovered: boolean) => void;
  incrementMemoryFragments: () => void;
  setTeleportTarget: (target: [number, number, number] | null) => void;
  setAnomalyState: (state: Partial<{isBlackout: boolean, showSilhouette: boolean}>) => void;
  toggleDebugMode: () => void;
}

export const useArchiveStore = create<ArchiveState>()(
  devtools((set, get) => ({
    // Core state defaults
    degradationLevel: 0,
    visitCount: 0,
    incidentCount: 0,
    archiveHealth: 100,
    memoryIntegrity: 100,
    favoriteSection: undefined,
    lastVisitedPage: undefined,

    // Session persistence defaults
    totalSessions: 0,
    totalTimeSpent: 0,
    lastVisitTimestamp: undefined,

    // Session runtime defaults
    session: {
      sessionStart: 0,
      sessionDuration: 0,
      longestSession: 0,
      visitStreak: 0,
    },

    // Collections defaults
    observationHistory: [],
    archiveMetrics: {
      favoriteSection: undefined,
      mostViewedProject: undefined,
      longestSession: 0,
      totalVisits: 0,
      idleEvents: 0,
      panicEvents: 0,
      lettersSent: 0,
      rareEventsSeen: 0,
      pagesVisited: {},
      lastVisit: undefined,
    },
    corruptionFlags: {
      typographyCorruption: false,
      ambientAudioCorruption: false,
      hiddenContentUnlocked: false,
      observerActivity: false,
      silhouetteActivity: false,
    },
    pageVisits: [],
    rareEventCooldowns: {},

    // Game Systems defaults
    inventory: [],
    journalNotes: [],
    mapDiscovered: false,
    mapAnomalyRevealed: false,
    memoryFragments: 0,
    activeDocument: null,
    isAwakened: false,
    isBlackout: false,
    showSilhouette: false,
    isDebugMode: false,
    teleportTarget: null,

    // Actions implementation
    setActiveDocument: (doc) => set({ activeDocument: doc }),
    discoverMap: () => set({ mapDiscovered: true }),
    revealMapAnomaly: () => set({ mapAnomalyRevealed: true }),
    incrementVisit: () => set(state => ({ visitCount: state.visitCount + 1 })),
    incrementIncident: () => set(state => ({ incidentCount: state.incidentCount + 1 })),
    addIdleTime: seconds => {
      const inc = seconds >= 30 ? 0.02 : seconds >= 15 ? 0.01 : 0;
      if (inc) {
        set(state => ({
          degradationLevel: Math.min(1, state.degradationLevel + inc),
          archiveMetrics: {
            ...state.archiveMetrics,
            idleEvents: state.archiveMetrics.idleEvents + 1,
          }
        }));
      }
    },
    addPanicEvent: () =>
      set(state => ({
        degradationLevel: Math.min(1, state.degradationLevel + 0.03),
        archiveMetrics: {
          ...state.archiveMetrics,
          panicEvents: state.archiveMetrics.panicEvents + 1,
        }
      })),
    setDegradation: value => set({ degradationLevel: Math.min(1, Math.max(0, value)) }),
    setLastVisited: page => set({ lastVisitedPage: page }),
    setFavoriteSection: section => set({ favoriteSection: section }),
    addObservation: entry =>
      set(state => ({ observationHistory: [...state.observationHistory, entry] })),
    recordMetric: (name, value) =>
      set(state => ({
        archiveMetrics: {
          ...state.archiveMetrics,
          [name]: ((state.archiveMetrics as any)[name] as number) + value,
        },
      })),
    setSessionInfo: info => set(state => ({ session: { ...state.session, ...info } })),
    updateCorruptionFlags: flags =>
      set(state => ({ corruptionFlags: { ...state.corruptionFlags, ...flags } })),
    recordPageVisit: visit =>
      set(state => ({
        pageVisits: [...state.pageVisits, visit],
        archiveMetrics: {
          ...state.archiveMetrics,
          totalVisits: state.archiveMetrics.totalVisits + 1,
          pagesVisited: {
            ...state.archiveMetrics.pagesVisited,
            [visit.route]: (state.archiveMetrics.pagesVisited[visit.route] || 0) + 1,
          },
        },
        lastVisitTimestamp: visit.timestamp,
      })),
    incrementTotalSessions: () => set(state => ({ totalSessions: state.totalSessions + 1 })),
    addTimeSpent: seconds => set(state => ({ totalTimeSpent: state.totalTimeSpent + seconds })),
    setLastVisitTimestamp: ts => set({ lastVisitTimestamp: ts }),
    reset: () =>
      set({
        degradationLevel: 0,
        visitCount: 0,
        incidentCount: 0,
        archiveHealth: 100,
        memoryIntegrity: 100,
        favoriteSection: undefined,
        lastVisitedPage: undefined,
        totalSessions: 0,
        totalTimeSpent: 0,
        lastVisitTimestamp: undefined,
        session: { sessionStart: Date.now(), sessionDuration: 0, longestSession: 0, visitStreak: 0 },
        observationHistory: [],
        archiveMetrics: {
          favoriteSection: undefined,
          mostViewedProject: undefined,
          longestSession: 0,
          totalVisits: 0,
          idleEvents: 0,
          panicEvents: 0,
          lettersSent: 0,
          rareEventsSeen: 0,
          pagesVisited: {},
          lastVisit: undefined,
        },
        corruptionFlags: {
          typographyCorruption: false,
          ambientAudioCorruption: false,
          hiddenContentUnlocked: false,
          observerActivity: false,
          silhouetteActivity: false,
        },
        pageVisits: [],
        rareEventCooldowns: {},
        inventory: [],
        journalNotes: [],
        mapDiscovered: false,
        memoryFragments: 0,
      }),

    // Game Actions Implementation
    addInventoryItem: item => set(state => {
      if (!state.inventory.includes(item)) {
        const newInventory = [...state.inventory, item];
        // Trigger Awakening if 3 items are collected
        const willAwaken = newInventory.length >= 3;
        return { 
          inventory: newInventory,
          isAwakened: state.isAwakened || willAwaken
        };
      }
      return state;
    }),
    addJournalNote: (note) => set((state) => ({ journalNotes: [...state.journalNotes, note] })),
    setMapDiscovered: (discovered) => set({ mapDiscovered: discovered }),
    incrementMemoryFragments: () => set((state) => ({ memoryFragments: state.memoryFragments + 1 })),
    setTeleportTarget: (target) => set({ teleportTarget: target }),
    setAnomalyState: (state) => set(state),
    toggleDebugMode: () => set((state) => ({ isDebugMode: !state.isDebugMode })),
  }))
);
