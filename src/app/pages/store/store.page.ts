import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController } from '@ionic/angular';
import { StoreDTO } from 'src/app/core/dtos/stores';
import { Storage } from '@ionic/storage-angular';
import { StoreService } from 'src/app/services/store.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { LogsService } from 'src/app/services/logs.service';
import { LogDTO } from 'src/app/core/dtos/log.dto';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StorePage implements OnInit {

  constructor(
    private storage: Storage,
    private storeService: StoreService,
    private logsService: LogsService,
    private utilsService: UtilsService
  ) { }

  store!: StoreDTO;
  logs: LogDTO[] = []
  async ngOnInit() {
  }

  async ionViewDidEnter() {
    await this.loadPage();
  }

  async loadPage() {
    const loading = await this.utilsService.showLoading();
    this.store = (await this.storeService.getStore(Number(await this.storage.get('selectedStore')))).data;
    this.logs = ((await this.logsService.getLogsByStore(this.store.id)).data).sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    loading.dismiss();
  }

}
