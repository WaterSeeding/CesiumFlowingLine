import Dexie, { Table } from 'dexie';
import { AmbientOcclusionParamsInterface } from './index';

export const db = new Dexie('CesiumAmbientOcclusionDB');

db.version(1).stores({
  ambientOcclusion:
    '++id, show, ambientOcclusionOnly, bias, blurStepSize, delta, frustumLength, intensity, lengthCap, sigma, stepSize',
});

export type ambientOcclusionTableInterface =
  Table<AmbientOcclusionParamsInterface>;

export const ambientOcclusionTable: ambientOcclusionTableInterface =
  db.table('ambientOcclusion');
