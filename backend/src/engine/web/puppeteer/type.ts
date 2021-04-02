import * as puppeteer from 'puppeteer-core';
import { WebEngineType } from '../common/type';

export class PuppeteerWebEngineType implements WebEngineType {
    
  instance: puppeteer.Browser;
  gotoOptions: Parameters<puppeteer.Page['goto']>;
  clickOptions: Parameters<puppeteer.Page['click']>;
  queryOptions: Parameters<puppeteer.Page['$$']>;
  switchPageOptions: [];
  closeOptions: [];
}
