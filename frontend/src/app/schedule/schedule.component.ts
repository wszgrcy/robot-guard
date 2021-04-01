import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseScheduleStepShared } from '@rg-share';
import { CyiaRepositoryService } from 'cyia-ngx-common/repository';
import { ItemComponent } from './item/item.component';
import { ScheduleEntity } from './schedule.entity';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  dataSource: any[] = [];
  displayedColumns = ['name'];
  constructor(
    private http: CyiaRepositoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.findMany(ScheduleEntity).subscribe((result) => {
      console.log('result', result);
      this.dataSource = result;
    });
  }
  testClick(row: any, $event: any) {
    this.router.navigateByUrl(`schedule/item/${row._id}`,);
  }
}
