export interface RoofInput {
  rise: number;       // inches per 12" run
  runFeet: number;    // horizontal span in feet
  runInches?: number; // additional inches for run
}

export interface RoofResult {
  pitch: string;          // X:12 format
  angleDeg: number;       // degrees
  angleRad: number;       // radians
  slopePercent: number;   // percentage
  rafterLengthFeet: number;
  rafterLengthInches: number;
  inputs: RoofInput;
}

export interface CommonPitch {
  pitch: string;
  angle: number;
  description: string;
}

export const COMMON_PITCHES: CommonPitch[] = [
  { pitch: '2:12', angle: 9.5, description: 'Low slope — flat roofs, sheds' },
  { pitch: '3:12', angle: 14.0, description: 'Low slope — porch roofs, awnings' },
  { pitch: '4:12', angle: 18.4, description: 'Conventional — standard residential' },
  { pitch: '5:12', angle: 22.6, description: 'Conventional — cape cod, ranches' },
  { pitch: '6:12', angle: 26.6, description: 'Conventional — most homes' },
  { pitch: '7:12', angle: 30.3, description: 'Medium slope — colonial, victorian' },
  { pitch: '8:12', angle: 33.7, description: 'Medium slope — steep enough for snow shed' },
  { pitch: '9:12', angle: 36.9, description: 'Medium slope — tudor, gothic' },
  { pitch: '10:12', angle: 39.8, description: 'Steep slope — dramatic look' },
  { pitch: '12:12', angle: 45.0, description: 'Steep slope — walkable with care' },
];

export function calculateRoofPitch(input: RoofInput): RoofResult {
  const totalRun = input.runFeet + (input.runInches || 0) / 12;

  const riseFeet = (input.rise / 12) * totalRun;
  const angleRad = Math.atan(riseFeet / totalRun);
  const angleDeg = angleRad * (180 / Math.PI);
  const slopePercent = (input.rise / 12) * 100;
  const rafterLengthFeet = Math.sqrt(Math.pow(totalRun, 2) + Math.pow(riseFeet, 2));
  const rafterLengthInches = Math.round((rafterLengthFeet % 1) * 12);

  return {
    pitch: `${input.rise}:12`,
    angleDeg: round(angleDeg, 1),
    angleRad: round(angleRad, 3),
    slopePercent: round(slopePercent, 1),
    rafterLengthFeet: Math.floor(rafterLengthFeet),
    rafterLengthInches,
    inputs: input,
  };
}

function round(num: number, decimals: number): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}

export function formatFeetAndInches(feet: number, inches: number): string {
  if (inches === 0) return `${feet} ft`;
  return `${feet} ft ${inches} in`;
}

export function formatAngle(degrees: number): string {
  return `${degrees}°`;
}

export function formatPercent(value: number): string {
  return `${value}%`;
}

export function validateRoofInput(input: RoofInput): string[] {
  const errors: string[] = [];
  if (!input.rise || input.rise <= 0) errors.push('Rise must be greater than 0');
  if (input.rise > 36) errors.push('Rise seems too high (max 36 in per 12 in run)');
  if (!input.runFeet || input.runFeet <= 0) errors.push('Run must be greater than 0');
  if (input.runFeet > 100) errors.push('Run seems too high (max 100 ft)');
  return errors;
}
