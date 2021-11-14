import { Cleanup } from "../types";

export class Cleanups {
  private cleanups: Cleanup[] = []

  add(...cleanups: Cleanup[]): void {
    this.cleanups.push(...cleanups)
  }

  execute(): void {
    this.cleanups.forEach(fn => fn())
    this.cleanups = []
  }
}