import * as Cesium from 'cesium';
import { BloomParamsInterface } from './index';
import { bloomTableInterface } from './_db';

const defaultParams: BloomParamsInterface = {
  show: true,
  glowOnly: false,
  contrast: 255,
  brightness: 1,
  delta: 5,
  sigma: 10,
  stepSize: 7,
};

export const setParams = async (
  bloom: Cesium.PostProcessStageComposite,
  bloomTable: bloomTableInterface,
): Promise<BloomParamsInterface> => {
  let res = await bloomTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
