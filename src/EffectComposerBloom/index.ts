import * as Cesium from 'cesium';
import { bloomTable } from './_db';
import { setGui } from './_gui';
import { setParams } from './_params';

export interface BloomParamsInterface {
  show: boolean;
  glowOnly: boolean;
  contrast: number;
  brightness: number;
  delta: number;
  sigma: number;
  stepSize: number;
}

class Bloom {
  viewer: Cesium.Viewer;
  bloom: Cesium.PostProcessStageComposite;
  bloomInitParams!: BloomParamsInterface;

  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    bloomParams?: BloomParamsInterface,
    hideGui?: boolean,
  ) {
    this.viewer = viewer;
    this.bloom = this.viewer.scene.postProcessStages.bloom;
    setParams(this.bloom, bloomTable).then(
      (storeBloomParams: BloomParamsInterface) => {
        this.bloomInitParams = bloomParams || storeBloomParams;
        let bloomGui = setGui(
          gui,
          this.bloomInitParams,
          this.bloom,
          (bloomParams: BloomParamsInterface) => {
            bloomTable.add(bloomParams);
          },
        );

        if (hideGui) {
          bloomGui.hide();
        }
      },
    );
  }
}

export default Bloom;
