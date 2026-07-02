import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ItemMetadata, DocumentContent, ElevatorState, InteractionPromptData } from '../data/types';

export enum GameMode {
  PLAYING = "PLAYING",
  INSPECTING = "INSPECTING",
  RESUMING = "RESUMING"
}

interface GameState {
  // Core Game State
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  clearInteraction: (resumePlaying?: boolean) => void;
  // Inventory
  inventory: Record<string, ItemMetadata>;
  addInventoryItem: (item: ItemMetadata) => void;
  markItemAsRead: (id: string) => void;

  // Active Inspection
  activeDocument: DocumentContent | null;
  inspectDocument: (doc: DocumentContent | null) => void;

  // Room & Milestones
  unlockedRooms: string[];
  unlockRoom: (roomId: string) => void;
  storyMilestones: Record<string, boolean>;
  setMilestone: (milestoneId: string, value: boolean) => void;
  elevatorState: ElevatorState;
  setElevatorState: (state: ElevatorState) => void;

  // Interaction Prompts
  activePrompt: InteractionPromptData | null;
  setActivePrompt: (prompt: InteractionPromptData | null) => void;
}

export const useGameState = create<GameState>()(
  persist(
    (set) => ({
      // Core Game State
      gameMode: GameMode.PLAYING,
      setGameMode: (mode) => set({ gameMode: mode }),
      clearInteraction: (resumePlaying = false) => set((state) => ({ 
        activeDocument: null, 
        gameMode: resumePlaying ? GameMode.PLAYING : GameMode.RESUMING 
      })),

      // Inventory
      inventory: {},
      addInventoryItem: (item) =>
        set((state) => ({
          inventory: { ...state.inventory, [item.id]: { ...item, acquired: true } },
        })),
      markItemAsRead: (id) =>
        set((state) => {
          const item = state.inventory[id];
          if (!item) return state;
          return {
            inventory: { ...state.inventory, [id]: { ...item, isNew: false } },
          };
        }),

      // Active Inspection
      activeDocument: null,
      inspectDocument: (doc) => set({ activeDocument: doc, gameMode: doc ? GameMode.INSPECTING : GameMode.RESUMING }),

      // Room & Milestones
      unlockedRooms: ['reception', 'personnel', 'records', 'communications'], // Default unlocked for Greybox
      unlockRoom: (roomId) =>
        set((state) => ({
          unlockedRooms: state.unlockedRooms.includes(roomId)
            ? state.unlockedRooms
            : [...state.unlockedRooms, roomId],
        })),
      storyMilestones: {},
      setMilestone: (milestoneId, value) =>
        set((state) => ({
          storyMilestones: { ...state.storyMilestones, [milestoneId]: value },
        })),
      elevatorState: 'locked',
      setElevatorState: (state) => set({ elevatorState: state }),

      // Interaction Prompts
      activePrompt: null,
      setActivePrompt: (prompt) => set({ activePrompt: prompt }),
    }),
    {
      name: 'auxilium-asylum-save',
      // Do not persist active inspection or current prompts
      partialize: (state) => ({
        inventory: state.inventory,
        unlockedRooms: state.unlockedRooms,
        storyMilestones: state.storyMilestones,
        elevatorState: state.elevatorState,
      }),
    }
  )
);
