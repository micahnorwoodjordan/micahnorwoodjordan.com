import { Component, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgIf } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet, MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import {MatListModule} from '@angular/material/list';

import { ContextService } from '../../app/services/context.service';


@Component({
  selector: 'app-header',
  imports: [
    FlexLayoutModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIf,
    MatIconModule,
    MatBottomSheetModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private contextService: ContextService) {  }

  userIsOnMobile: boolean = false;
  displayRouterNav: boolean = false;

  private _bottomSheet = inject(MatBottomSheet);

  ngOnInit() { this.setUserIsOnMobile(this.contextService.userIsOnMobile); }

  setUserIsOnMobile(newValue: boolean) { this.userIsOnMobile = newValue; }

  openBottomSheet() { this._bottomSheet.open(BottomsheetComponent); }
}

@Component({
  selector: 'bottomsheet',
  templateUrl: 'bottomsheet.html',
  imports: [
    MatListModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
})
export class BottomsheetComponent {
  constructor() { }

  private _bottomSheetRef = inject<MatBottomSheetRef<BottomsheetComponent>>(MatBottomSheetRef);

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
