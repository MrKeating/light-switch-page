
export interface LuminaResponse {
  message: string;
  intensity: number; // 0-100
}

export enum LightStatus {
  ON = 'ON',
  OFF = 'OFF'
}
