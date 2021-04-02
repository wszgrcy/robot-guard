import * as vm from 'vm';
import * as ts from 'typescript';
export function runScript(str: string, context: Record<string, any> = {}) {
  console.log('执行脚本');
  let obj = {};
  for (const key in context) {
    if (Object.prototype.hasOwnProperty.call(context, key)) {
      Object.defineProperty(obj, key, {
        writable: false,
        enumerable: false,
        configurable: false,
        get() {
          return context[key];
        },
      });
    }
  }
  return new RunScript(str, obj).exec();
}

class RunScript {
  private code: string;
  constructor(private str: string, private context: Record<string, any>) {
    if (this.context === null) {
      this.context = {};
    } else if (this.context !== null && typeof this.context !== 'object') {
      this.context = {};
    }
  }
  compileTsToJs() {
    console.log('脚本', this.str);
  
    let result = ts.transpileModule(this.str, {
      compilerOptions: { sourceMap: false },
    });
    if (result.diagnostics && result.diagnostics.length) {
      throw `编译脚本失败${result.diagnostics}`;
    }
    this.code = result.outputText;
  }
  exec() {
    console.log('准备执行', this.code);
    console.log('上下文', this.context);
    // vm.createContext(this.context);
    let result = vm.runInNewContext(this.code, this.context);
    return result;
  }
}
