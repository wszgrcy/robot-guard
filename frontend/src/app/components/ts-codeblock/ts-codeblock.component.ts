import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import * as monaco from 'monaco-editor';
@Component({
  selector: 'app-ts-codeblock',
  templateUrl: './ts-codeblock.component.html',
  styleUrls: ['./ts-codeblock.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TsCodeblockComponent),
      multi: true,
    },
    {
      provide: MatFormFieldControl,
      useExisting: TsCodeblockComponent,
    },
  ],
})
export class TsCodeblockComponent implements OnInit, ControlValueAccessor {
  instance!: monaco.editor.IStandaloneCodeEditor;
  @Input() codeType: 'plain' | 'function' = 'plain';
  value = '';
  onChangeFn = (str: string) => void 0;
  // onTouchedFn = () => void 0;
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    console.log('初始化');
    this.instance = monaco.editor.create(this.elementRef.nativeElement, {
      language: 'typescript',
      automaticLayout: true,
      value: `export default function(){

      }`,
    });
    this.instance.onDidChangeModelContent((e) => {
      this.notifyValueChange(this.instance.getValue());
    });
  }

  writeValue(value: string) {
    if (value === null || value === undefined) {
      return;
    }
    console.log('写入值');
    this.instance.setValue(value);
  }
  registerOnChange(fn: any) {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any) {
    // this.onTouchedFn = fn;
  }

  notifyValueChange(value: string) {
    this.onChangeFn(value);
    // this.onTouchedFn(value);
  }
}
