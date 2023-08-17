import * as Cesium from "cesium";

export const setCoordinateSystem = (
  viewer: Cesium.Viewer,
  position: Cesium.Cartesian3
) => {
  const heading = Cesium.Math.toRadians(0);
  const pitch = 0;
  const roll = 0;
  const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
  const fixedFrameTransform = Cesium.Transforms.eastNorthUpToFixedFrame;
  const modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(
    position,
    hpr,
    Cesium.Ellipsoid.WGS84,
    fixedFrameTransform
  );
  viewer.scene.primitives.add(
    // X轴为红色 Y是绿色 Z是蓝色
    // Classical East North local Frame
    new Cesium.DebugModelMatrixPrimitive({
      modelMatrix: modelMatrix,
      length: 10000.0,
      width: 2.0,
    })
  );
};
