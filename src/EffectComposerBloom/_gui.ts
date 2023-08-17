import * as Cesium from 'cesium';
import { BloomParamsInterface } from './index';
import { downloadJson } from './utils/downloadJson';
import { setGuiCheckbox } from './utils/setGuiCheckbox';
import { setGuiSlide } from './utils/setGuiSlide';

const reviseGui = (
  bloom: Cesium.PostProcessStageComposite,
  guiParams: BloomParamsInterface,
) => {
  bloom.enabled = Boolean(guiParams.show);
  bloom.uniforms.glowOnly = Boolean(guiParams.glowOnly);
  bloom.uniforms.contrast = Number(guiParams.contrast);
  bloom.uniforms.brightness = Number(guiParams.brightness);
  bloom.uniforms.delta = Number(guiParams.delta);
  bloom.uniforms.sigma = Number(guiParams.sigma);
  bloom.uniforms.stepSize = Number(guiParams.stepSize);
};

const storeGui = (
  guiParams: BloomParamsInterface,
  storeCb: (data: any) => void,
) => {
  storeCb({
    show: Boolean(guiParams.show),
    glowOnly: Boolean(guiParams.glowOnly),
    contrast: Number(guiParams.contrast),
    brightness: Number(guiParams.brightness),
    delta: Number(guiParams.delta),
    sigma: Number(guiParams.sigma),
    stepSize: Number(guiParams.stepSize),
  });
};

export const setGui = (
  gui: dat.GUI,
  guiParams: BloomParamsInterface,
  bloom: Cesium.PostProcessStageComposite,
  storeCb?: (data: any) => void,
) => {
  let bloom_folder = gui.addFolder('bloom');
  bloom_folder.close();

  let initGuiParams = Object.assign({}, guiParams);
  reviseGui(bloom, initGuiParams);
  let downloadGuiParams = Object.assign({}, guiParams);

  setGuiCheckbox(bloom_folder, guiParams, 'show', 'show', () => {
    reviseGui(bloom, guiParams);
  });

  setGuiCheckbox(bloom_folder, guiParams, 'glowOnly', 'glowOnly', () => {
    reviseGui(bloom, guiParams);
  });

  setGuiSlide(
    bloom_folder,
    guiParams,
    'contrast',
    'contrast',
    {
      min: -255.0,
      max: 255.0,
      step: 0.01,
    },
    () => {
      reviseGui(bloom, guiParams);
    },
  );

  setGuiSlide(
    bloom_folder,
    guiParams,
    'brightness',
    'brightness',
    {
      min: -1.0,
      max: 1.0,
      step: 0.01,
    },
    () => {
      reviseGui(bloom, guiParams);
    },
  );

  setGuiSlide(
    bloom_folder,
    guiParams,
    'delta',
    'delta',
    {
      min: 1,
      max: 5,
      step: 0.01,
    },
    () => {
      reviseGui(bloom, guiParams);
    },
  );

  setGuiSlide(
    bloom_folder,
    guiParams,
    'sigma',
    'sigma',
    {
      min: 1,
      max: 10,
      step: 0.01,
    },
    () => {
      reviseGui(bloom, guiParams);
    },
  );

  setGuiSlide(
    bloom_folder,
    guiParams,
    'stepSize',
    'stepSize',
    {
      min: 0,
      max: 7,
      step: 0.01,
    },
    () => {
      reviseGui(bloom, guiParams);
    },
  );

  let obj = {
    ensure: () => {
      storeGui(guiParams, storeCb!);
      downloadGuiParams = Object.assign({}, guiParams);
    },
    reset: () => {
      reviseGui(bloom, initGuiParams);
      storeGui(initGuiParams, storeCb!);
      bloom_folder.revert(bloom_folder);
      downloadGuiParams = Object.assign({}, initGuiParams);
    },
    download: () => {
      downloadJson('bloom.json', downloadGuiParams);
    },
  };

  bloom_folder.add(obj, 'ensure').name('确定参数');
  bloom_folder.add(obj, 'reset').name('重置参数');
  bloom_folder.add(obj, 'download').name('下载参数');

  return bloom_folder;
};
