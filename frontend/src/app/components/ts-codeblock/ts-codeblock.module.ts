import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsCodeblockComponent } from './ts-codeblock.component';
import { CyiaMonacoTextmateModule } from 'cyia-ngx-common/monaco-textmate';

@NgModule({
  imports: [CommonModule],
  declarations: [TsCodeblockComponent],
  exports: [TsCodeblockComponent],
})
export class TsCodeblockModule {}
