
export interface LuminaResponse {
  message: string;
  intensity: number; // 0-100
}

export enum LightStatus {
  ON = 'ON',
  OFF = 'OFF'
}

export enum AIPersonality {
  WITTY = 'Witty',
  ZEN = 'Zen',
  FORMAL = 'Formal'
}
