import * as Cesium from 'cesium';
import { AmbientOcclusionParamsInterface } from './index';
import { downloadJson } from './utils/downloadJson';
import { setGuiCheckbox } from './utils/setGuiCheckbox';
import { setGuiSlide } from './utils/setGuiSlide';

const reviseGui = (
  ambientOcclusion: Cesium.PostProcessStageComposite,
  guiParams: AmbientOcclusionParamsInterface,
) => {
  ambientOcclusion.enabled = Boolean(guiParams.show);
  ambientOcclusion.uniforms.ambientOcclusionOnly = Boolean(
    guiParams.ambientOcclusionOnly,
  );
  ambientOcclusion.uniforms.bias = Number(guiParams.bias);
  ambientOcclusion.uniforms.blurStepSize = Number(guiParams.blurStepSize);
  ambientOcclusion.uniforms.delta = Number(guiParams.delta);
  ambientOcclusion.uniforms.frustumLength = Number(guiParams.frustumLength);
  ambientOcclusion.uniforms.intensity = Number(guiParams.intensity);
  ambientOcclusion.uniforms.lengthCap = Number(guiParams.lengthCap);
  ambientOcclusion.uniforms.sigma = Number(guiParams.sigma);
  ambientOcclusion.uniforms.stepSize = Number(guiParams.stepSize);
};

const storeGui = (
  guiParams: AmbientOcclusionParamsInterface,
  storeCb: (data: any) => void,
) => {
  storeCb({
    show: Boolean(guiParams.show),
    ambientOcclusionOnly: Boolean(guiParams.ambientOcclusionOnly),
    bias: Number(guiParams.bias),
    blurStepSize: Number(guiParams.blurStepSize),
    delta: Number(guiParams.delta),
    frustumLength: Number(guiParams.frustumLength),
    intensity: Number(guiParams.intensity),
    lengthCap: Number(guiParams.lengthCap),
    sigma: Number(guiParams.sigma),
    stepSize: Number(guiParams.stepSize),
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: AmbientOcclusionParamsInterface,
  ambientOcclusion: Cesium.PostProcessStageComposite,
  storeCb?: (data: any) => void,
) => {
  let ambientOcclusion_folder = gui.addFolder('AmbientOcclusion');
  ambientOcclusion_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(ambientOcclusion, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(ambientOcclusion_folder, guiParams, 'show', 'show', () => {
    reviseGui(ambientOcclusion, guiParams);
  });

  setGuiCheckbox(
    ambientOcclusion_folder,
    guiParams,
    'ambientOcclusionOnly',
    'ambientOcclusionOnly',
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  setGuiSlide(
    ambientOcclusion_folder,
    guiParams,
    'bias',
    'bias',
    {
      min: 0,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  setGuiSlide(
    ambientOcclusion_folder,
    guiParams,
    'blurStepSize',
    'blurStepSize',
    {
      min: 0,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  setGuiSlide(
    ambientOcclusion_folder,
    guiParams,
    'delta',
    'delta',
    {
      min: 0,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  setGuiSlide(
    ambientOcclusion_folder,
    guiParams,
    'frustumLength',
    'frustumLength',
    {
      min: 0,
      max: 10000,
      step: 1,
    },
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  setGuiSlide(
    ambientOcclusion_folder,
    guiParams,
    'intensity',
    'intensity',
    {
      min: 0,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  setGuiSlide(
    ambientOcclusion_folder,
    guiParams,
    'lengthCap',
    'lengthCap',
    {
      min: 0,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  setGuiSlide(
    ambientOcclusion_folder,
    guiParams,
    'sigma',
    'sigma',
    {
      min: 0,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  setGuiSlide(
    ambientOcclusion_folder,
    guiParams,
    'stepSize',
    'stepSize',
    {
      min: 0,
      max: 20,
      step: 0.01,
    },
    () => {
      reviseGui(ambientOcclusion, guiParams);
    },
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb!);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(ambientOcclusion, initGuiParams);
      storeGui(initGuiParams, storeCb!);
      ambientOcclusion_folder.revert(ambientOcclusion_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson('ambientOcclusion.json', downloadGuiParams);
    },
  };

  ambientOcclusion_folder.add(obj, 'ensure').name('确定参数');
  ambientOcclusion_folder.add(obj, 'reset').name('重置参数');
  ambientOcclusion_folder.add(obj, 'download').name('下载参数');

  return ambientOcclusion_folder;
};
