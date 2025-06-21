import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AgenciesService {
  constructor(private httpService: HttpService) {}

  async getAgencies(): Promise<any> {
    const url = 'https://api.app.studiospace.com/listings/list-agencies';
    const response = await firstValueFrom(this.httpService.get(url));
    return response.data;
  }
}
