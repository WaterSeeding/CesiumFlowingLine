import * as Cesium from 'cesium';
import * as dat from 'dat.gui';
import SkyBoxOnGround from './main/SkyBoxOnGround';
import { skyBoxTable } from './_db';
import { setGui } from './_gui';
import { setParams } from './_params';

type SourcesType = {
  name: string;
  sources: {
    [key: string]: string;
  };
};

export interface SkyBoxParamsInterface {
  show: boolean;
  sourcesType: string;
  sourcesList?: SourcesType[];
}

export default class SkyBox {
  viewer: Cesium.Viewer;
  skyBox!: SkyBoxOnGround;
  skyBoxParams: SkyBoxParamsInterface | undefined;
  constructor(
    viewer: Cesium.Viewer,
    gui: dat.GUI,
    skyBoxParams?: SkyBoxParamsInterface,
    hideGui?: boolean,
  ) {
    this.viewer = viewer;
    this.setInit(gui, skyBoxParams, hideGui);
  }

  setInit(
    gui: dat.GUI,
    skyBoxParams?: SkyBoxParamsInterface,
    hideGui?: boolean,
  ) {
    setParams(this.viewer.scene.skyBox, skyBoxTable).then(
      (storeCameraParams: SkyBoxParamsInterface) => {
        if (skyBoxParams?.sourcesList) {
          skyBoxParams.sourcesList = [
            ...storeCameraParams.sourcesList,
            ...skyBoxParams.sourcesList,
          ];
          this.skyBoxParams = skyBoxParams;
        } else {
          this.skyBoxParams = storeCameraParams;
        }

        let skyBoxGui = setGui(
          gui,
          this.skyBoxParams,
          this,
          (data: SkyBoxParamsInterface) => {
            skyBoxTable.add(data);
          },
        );
        if (hideGui) {
          skyBoxGui.close();
          skyBoxGui.hide();
        }
      },
    );
  }

  setShow(value: boolean) {
    if (this.skyBox) {
      this.skyBox.show = value;
    } else {
      this.viewer.scene.skyBox.show = value;
    }
  }

  setSources(sources: { [key: string]: string }) {
    if (!this.skyBox) {
      // console.log(
      //   "[this.viewer.scene.skyBox.isDestroyed()]",
      //   this.viewer.scene.skyBox.isDestroyed()
      // );
      if (!this.viewer.scene.skyBox.isDestroyed()) {
        this.viewer.scene.skyBox.destroy();
      }
      // console.log(
      //   "[this.viewer.scene.skyBox.isDestroyed()]",
      //   this.viewer.scene.skyBox.isDestroyed()
      // );
    } else {
      // console.log("[this.skyBox.isDestroyed()]", this.skyBox.isDestroyed());
      if (!this.skyBox.isDestroyed()) {
        this.skyBox.destroy();
      }
      // console.log("[this.skyBox.isDestroyed()]", this.skyBox.isDestroyed());
    }
    let skyBox = new SkyBoxOnGround({
      sources: sources,
    });
    this.viewer.scene.skyBox = skyBox;
    this.skyBox = skyBox;
  }
}
