import { WebEngineType } from './type';

export abstract class WebEngineBase<T extends WebEngineType> {
  instance: T['instance'];
  abstract init(): Promise<any>;
  abstract switchPage(...args: T['switchPageOptions']): Promise<any>;
  abstract goto(...args: T['gotoOptions']);
  abstract click(...args: T['clickOptions']): Promise<any>;
  abstract query(...args: T['queryOptions']): Promise<any>;
}
