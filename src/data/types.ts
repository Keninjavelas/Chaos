/**
 * Core Data Models for Phase 2: Gameplay Systems
 */

export type ItemCategory = 'document' | 'key' | 'audio' | 'tool' | 'collectible';

export interface ItemMetadata {
  id: string;
  name: string;
  description: string;
  category: ItemCategory;
  /** Optional icon path (e.g. /assets/icons/key.png) */
  icon?: string;
  /** Whether the item is currently in the player's inventory */
  acquired: boolean;
  /** Whether the item has been inspected/read yet */
  isNew: boolean;
}

export type DocumentType = 'letter' | 'dossier' | 'blueprint' | 'note' | 'certificate' | 'log' | 'terminal' | 'case_file' | 'personnel-file' | 'personnel-dossier';

export interface DocumentContent {
  id: string;
  title: string;
  type: DocumentType;
  /** The main body of text for the document */
  content: string;
  /** Optional author or sender */
  author?: string;
  /** Optional date string */
  date?: string;
  /** Optional image attachment path */
  attachmentImage?: string;
  /** Optional interactive link (e.g. mailto:, GitHub, LinkedIn) */
  interactiveLink?: {
    type: 'email' | 'url';
    url: string;
    label: string;
  };
  /** Dynamic label for opening the document (e.g. "Unfold Letter") */
  interactionLabel?: string;
  /** Dynamic label for closing the document (e.g. "Fold Letter") */
  closeLabel?: string;
}

export type ElevatorState = 'locked' | 'unlocked' | 'maintenance';

export type InteractionKind = 'INSPECT' | 'READ' | 'USE' | 'OPEN' | 'VIEW';

export interface InteractionPromptData {
  text: string;
  /** Optional specific key binding to display, defaults to 'E' */
  key?: string;
}

export interface InteractionTarget {
  id: string;
  kind: InteractionKind;
  label: string;
  distance: number;
  priority: number;
  trigger: () => void;
}
