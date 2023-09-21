import { create } from 'zustand'

interface CharacterState {
  isOnFloor: boolean
  setIsOnFloor: (isOnFloor: boolean) => void
  characterState: string
  setCharacterState: (characterState: string) => void
}

export const useCharacterStore = create<CharacterState>((set) => ({
  isOnFloor: true,
  setIsOnFloor: (isOnFloor) => set({ isOnFloor }),
  characterState: 'Idle',
  setCharacterState: (characterState) => set({ characterState }),
}))
