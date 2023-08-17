import "cesium/Build/Cesium/Widgets/widgets.css";
import { Ion, Viewer } from "cesium";

Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkNDE4MTdhNy0yYjYzLTQwNjktODJiMy0xMWU2MjI4MTA4ODQiLCJpZCI6MjU5LCJpYXQiOjE2OTA5MDkwMjZ9.G-iUU-kiQeQx74_iQdhyc5IUrVbIIFDhFx7RFn94LaQ";

const options: Viewer.ConstructorOptions = {
  infoBox: false,
  selectionIndicator: false,
  shadows: true,
  shouldAnimate: true,
  contextOptions: {
    requestWebgl1: false,
  },
};

export const viewer = new Viewer("cesium-container", options);
