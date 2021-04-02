import { WebEngineBase } from '../common/web.base';
import * as puppeteer from 'puppeteer-core';
import { CHROMIUM_PATH } from '@rgb-config';
import { PuppeteerWebEngineType } from './type';
export class PuppeteerWebEngine extends WebEngineBase<PuppeteerWebEngineType> {
  currentPage: puppeteer.Page;
  constructor() {
    super();
  }
  async init() {
    this.instance = await puppeteer.launch({
      headless: false,
      executablePath: CHROMIUM_PATH,
    });
    let pages = await this.instance.pages();
    this.currentPage = pages[0] || (await this.instance.newPage());
  }
  async goto(url: string, options?: PuppeteerWebEngineType['gotoOptions'][1]) {
    if (!this.currentPage) {
      await this.init()
    }
    return this.currentPage.goto(url, options);
  }
  async click(selector: string) {
    return this.currentPage.click(selector);
  }
  async query(selector: string) {
    return this.currentPage.$$(selector);
  }
  async getElementProperty(selector: string, property: string) {
    return this.currentPage.$$eval(selector, (elements) =>
      elements.map((element) => element[property]),
    );
  }
  async wait(time: number);
  async wait(selector: string);
  async wait(arg: string | number) {
    if (typeof arg === 'string') {
      await this.currentPage.waitForSelector(arg, { timeout: 1000 * 10 });
    } else {
      await this.currentPage.waitForTimeout(arg);
    }
  }
  async switchPage() {}
  async close() {
    return this.instance.close();
  }
  async input(selector: string, text: string) {
    let el = await this.currentPage.$(selector);
    await el.focus();
    await this.currentPage.keyboard.type(text);
  }
}

/**
 * 网页操作
 * 访问
 * 点击
 * 截图
 * 输入
 * 查询
 * 判断
 * 自定义脚本
 * 保存
 * 等待(时间,类型)
 */
