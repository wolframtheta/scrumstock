import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, EnvironmentInjector, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  public selectedTab!: string;
  constructor(
    private storage: Storage,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.storage.set('selectedStore', this.route.snapshot.params['idStore']);
  }
}
