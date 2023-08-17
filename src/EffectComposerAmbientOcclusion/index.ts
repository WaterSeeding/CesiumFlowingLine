import * as Cesium from 'cesium';
import { ambientOcclusionTable } from './_db';
import { setGui } from './_gui';
import { setParams } from './_params';

export interface AmbientOcclusionParamsInterface {
  show: boolean;
  ambientOcclusionOnly: boolean;
  bias: number;
  blurStepSize: number;
  delta: number;
  frustumLength: number;
  intensity: number;
  lengthCap: number;
  sigma: number;
  stepSize: number;
}

class AmbientOcclusion {
  viewer: Cesium.Viewer;
  ambientOcclusion: Cesium.PostProcessStageComposite;
  ambientOcclusionInitParams!: AmbientOcclusionParamsInterface;

  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    ambientOcclusionParams?: AmbientOcclusionParamsInterface,
    hideGui?: boolean,
  ) {
    this.viewer = viewer;
    this.ambientOcclusion =
      this.viewer.scene.postProcessStages.ambientOcclusion;

    if (
      !Cesium.PostProcessStageLibrary.isAmbientOcclusionSupported(viewer.scene)
    ) {
      window.alert('当前浏览器不支持Ambient Occlusion 阶段处理！');
    } else {
      setParams(this.ambientOcclusion, ambientOcclusionTable).then(
        (storeAmbientOcclusionParams: AmbientOcclusionParamsInterface) => {
          this.ambientOcclusionInitParams =
            ambientOcclusionParams || storeAmbientOcclusionParams;
          let ambientOcclusionGui = setGui(
            gui,
            this.ambientOcclusionInitParams,
            this.ambientOcclusion,
            (ambientOcclusionParams: AmbientOcclusionParamsInterface) => {
              ambientOcclusionTable.add(ambientOcclusionParams);
            },
          );
          if (hideGui) {
            ambientOcclusionGui.hide();
          }
        },
      );
    }
  }
}

export default AmbientOcclusion;
