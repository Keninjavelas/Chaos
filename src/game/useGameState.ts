import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ItemMetadata, DocumentContent, ElevatorState, InteractionPromptData, InteractionTarget } from '../data/types';

export enum GameMode {
  PLAYING = "PLAYING",
  INSPECTING = "INSPECTING",
  INTERACTING = "INTERACTING",
  RESUMING = "RESUMING"
}

interface GameState {
  // Core Game State
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  clearInteraction: () => void;
  // Inventory
  inventory: Record<string, ItemMetadata>;
  addInventoryItem: (item: ItemMetadata) => void;
  markItemAsRead: (id: string) => void;

  // Active Inspection, Computer Terminal & Keypad Safe
  activeDocument: DocumentContent | null;
  inspectDocument: (doc: DocumentContent | null) => void;
  activeTerminal: string | null;
  setActiveTerminal: (id: string | null) => void;
  activeKeypad: string | null;
  setActiveKeypad: (id: string | null) => void;
  openDrawers: Record<string, boolean>;
  toggleDrawer: (id: string) => void;
  unlockedSafes: Record<string, boolean>;
  unlockSafe: (id: string) => void;

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
  activeInteraction: InteractionTarget | null;
  setInteractionTarget: (target: InteractionTarget, frame: number) => void;
  clearInteractionTarget: () => void;
  interactionTargetFrame: number | null;
  interactionMessage: string | null;
  setInteractionMessage: (message: string | null) => void;
}

export const useGameState = create<GameState>()(
  persist(
    (set) => ({
      // Core Game State
      gameMode: GameMode.PLAYING,
      setGameMode: (mode) => set({ gameMode: mode }),
      clearInteraction: () => set(() => ({
        activeDocument: null, 
        activeTerminal: null,
        activeKeypad: null,
        activeInteraction: null,
        gameMode: GameMode.RESUMING,
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

      // Active Inspection, Computer Terminal & Keypad Safe
      activeDocument: null,
      inspectDocument: (doc) => set({ activeDocument: doc, gameMode: doc ? GameMode.INSPECTING : GameMode.RESUMING }),
      activeTerminal: null,
      setActiveTerminal: (id) => set({ activeTerminal: id, gameMode: id ? GameMode.INTERACTING : GameMode.RESUMING }),
      activeKeypad: null,
      setActiveKeypad: (id) => set({ activeKeypad: id, gameMode: id ? GameMode.INTERACTING : GameMode.RESUMING }),
      openDrawers: {},
      toggleDrawer: (id) =>
        set((state) => ({
          openDrawers: { ...state.openDrawers, [id]: !state.openDrawers[id] },
        })),
      unlockedSafes: {},
      unlockSafe: (id) =>
        set((state) => ({
          unlockedSafes: { ...state.unlockedSafes, [id]: true },
        })),

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
      activeInteraction: null,
      interactionTargetFrame: null,
      setInteractionTarget: (target, frame) => set((state) => {
        const current = state.interactionTargetFrame === frame ? state.activeInteraction : null;
        const shouldReplace = !current || target.priority > current.priority || (target.priority === current.priority && target.distance < current.distance);
        return shouldReplace
          ? { activeInteraction: target, interactionTargetFrame: frame }
          : { interactionTargetFrame: frame };
      }),
      clearInteractionTarget: () => set({ activeInteraction: null, interactionTargetFrame: null }),
      interactionMessage: null,
      setInteractionMessage: (message) => set({ interactionMessage: message }),
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
