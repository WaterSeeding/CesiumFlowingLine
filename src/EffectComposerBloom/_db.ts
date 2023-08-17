import Dexie, { Table } from 'dexie';
import { BloomParamsInterface } from './index';

export const db = new Dexie('CesiumBloomDB');

db.version(1).stores({
  bloom: '++id, show, glowOnly, contrast, brightness, delta, sigma, stepSize',
});

export type bloomTableInterface = Table<BloomParamsInterface>;

export const bloomTable: bloomTableInterface = db.table('bloom');
