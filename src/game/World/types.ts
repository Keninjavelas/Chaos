export interface RoomProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  onInteractMap?: () => void;
}
