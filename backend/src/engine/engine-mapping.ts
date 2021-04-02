import { ActionTypeEnum as PuppeteerActionTypeEnum, EngineType } from '@rg-share';
import { PuppeteerWebEngine } from './web/puppeteer/puppeteer';
/** 引擎映射 */
export const ENGINE_MAPPING = {
  [EngineType.Puppeteer]: PuppeteerWebEngine,
};

