import * as Cesium from 'cesium';
import { AmbientOcclusionParamsInterface } from './index';
import { ambientOcclusionTableInterface } from './_db';

const defaultParams: AmbientOcclusionParamsInterface | any = {
  show: true,
};

export const setParams = async (
  ambientOcclusion: Cesium.PostProcessStageComposite,
  ambientOcclusionTable: ambientOcclusionTableInterface,
): Promise<AmbientOcclusionParamsInterface> => {
  defaultParams.ambientOcclusionOnly =
    ambientOcclusion.uniforms.ambientOcclusionOnly;
  defaultParams.bias = ambientOcclusion.uniforms.bias;
  defaultParams.blurStepSize = ambientOcclusion.uniforms.blurStepSize;
  defaultParams.delta = ambientOcclusion.uniforms.delta;
  defaultParams.frustumLength = ambientOcclusion.uniforms.frustumLength;
  defaultParams.intensity = ambientOcclusion.uniforms.intensity;
  defaultParams.lengthCap = ambientOcclusion.uniforms.lengthCap;
  defaultParams.sigma = ambientOcclusion.uniforms.sigma;
  defaultParams.stepSize = ambientOcclusion.uniforms.stepSize;

  let res = await ambientOcclusionTable.toArray();
  let latestResValue = res[res.length - 1];
  return latestResValue || defaultParams;
};
