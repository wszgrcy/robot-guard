import { objectToOptions } from "../util/object-to-options";
import { ActionOptions } from "./puppeteer";

/** 引擎类型 */
export enum EngineType {
  Puppeteer,
}
export const engineTypeObject = {
  [EngineType.Puppeteer]: {
    name: EngineType[EngineType.Puppeteer],
    enum: EngineType.Puppeteer,
    options:ActionOptions
  },
};
export const engineTypeOptions = objectToOptions(engineTypeObject, ["label", "name"], ["value", "enum"]);
