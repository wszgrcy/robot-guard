import { INestApplication } from '@nestjs/common';
import { PuppeteerWebEngine } from '../../../src/engine/web/puppeteer/puppeteer';

fdescribe('puppeteer', () => {
  let engine = new PuppeteerWebEngine();

  beforeEach(async () => {
    await engine.init();
  });
  xit('init', () => {
    expect(engine.instance).toBeTruthy();
  });
  it('login ', async () => {
    await engine.goto(`http://htz.worktile.live/signin?returnUrl=%2Fteams`);
    await engine.wait('app-signin');

    // let el = await template.query('[name="userAccount"]');
    await engine.input('[name="userAccount"]', 'chen_test');
    await engine.input('input[type="password"', '654321a');
    await engine.click('thy-form-group-footer button');
    await engine.wait(2000);
    await engine.goto('http://localhost:4200', { waitUntil: 'networkidle2' });
    await engine.wait(3000);
    await engine.click('.login-btn');

    let body = await engine.query('body');
    expect(body.length).toBe(1);

    await engine.click('[href="/pay"]');
    let length = await engine.query('thy-content li');
    expect(length).toBe(2);
  });
  xit('visit module', async () => {
    await engine.goto('http://localhost:4200', { waitUntil: 'networkidle2' });
    await engine.goto('http://localhost:4200', { waitUntil: 'networkidle2' });
    await engine.wait('thy-sidebar');
    await engine.wait(3000);
    let body = await engine.query('body');
    expect(body.length).toBe(1);
// todo
    await engine.click('[href="/pay"]');
    let length = await engine.query('thy-content li');
    expect(length).toBe(2);
  });
  afterEach(async () => {
    await engine.close();
  });
});
