// src/archive/intro/introStateMachine.ts
/**
 * Simple finite‑state machine for the intro sequence.
 * States: Loading -> Blackout -> Quote -> Archive
 */
export type IntroState = "loading" | "blackout" | "quote" | "archive";

class IntroStateMachine {
  private state: IntroState = "loading";
  private listeners: ((state: IntroState) => void)[] = [];

  get current() {
    return this.state;
  }

  /** Register a listener to be notified on state changes */
  subscribe(fn: (state: IntroState) => void) {
    this.listeners.push(fn);
    fn(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  /** Advance to the next state */
  next() {
    switch (this.state) {
      case "loading":
        this.state = "blackout";
        break;
      case "blackout":
        this.state = "quote";
        break;
      case "quote":
        this.state = "archive";
        break;
      case "archive":
        // stay in archive – no further transitions
        break;
    }
    this.emit();
  }

  /** Force a state (used for skips) */
  set(state: IntroState) {
    this.state = state;
    this.emit();
  }

  private emit() {
    this.listeners.forEach(fn => fn(this.state));
  }
}

export const introStateMachine = new IntroStateMachine();
