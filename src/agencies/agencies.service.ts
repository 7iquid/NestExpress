import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AgenciesService {
  private readonly REGIONS = ['AU', 'GB', 'US', 'OTHERS'];
  private readonly SERVICE_GROUPS = [
    'Advertising, Brand & Creative',
    'Media, PR & Events',
    'others',
  ];
  private readonly API_ENDPOINT =
    'https://api.app.studiospace.com/listings/list-agencies';

  private initOutput() {
    const output = {};
    for (const region of this.REGIONS) {
      output[region] = this.SERVICE_GROUPS.map((name) => ({
        name,
        count: 0,
      }));
    }
    return output;
  }

  private async fetchAgencies(skip: number): Promise<any[]> {
    try {
      const res = await firstValueFrom(
        this.httpService.get(`${this.API_ENDPOINT}?skip=${skip}`),
      );
      return res.data?.[0] || [];
    } catch (e) {
      console.error('Fetch error at skip:', skip, e.message);
      return [];
    }
  }

  private getRegion(locations: any[]): string {
    for (const location of locations) {
      const code = location?.country?.code;
      if (this.REGIONS.includes(code)) {
        return code;
      }
    }
    return 'OTHERS';
  }

  private countServices(agencyService: any[]): Record<string, number> {
    const counts = Object.fromEntries(
      this.SERVICE_GROUPS.map((name) => [name, 0]),
    );

    for (const service of agencyService) {
      const group =
        service?.service?.serviceGroup?.name || 'others';
      if (counts[group] !== undefined) {
        counts[group]++;
      } else {
        counts['others']++;
      }
    }
    return counts;
  }

  constructor(private readonly httpService: HttpService) {}

  async generateReport(): Promise<any[]> {
    const output = this.initOutput();
    const retry = 12;
    const tasks = Array.from({ length: retry + 1 }, (_, i) =>
      this.fetchAgencies(i),
    );

    const results = await Promise.all(tasks);

    for (const data of results) {
      for (const company of data) {
        const locations = company?.locations || [];
        const agencyService = company?.agencyService || [];

        const region = this.getRegion(locations);
        const serviceCounts = this.countServices(agencyService);

        for (const serviceName in serviceCounts) {
          const count = serviceCounts[serviceName];
          const serviceList = output[region];
          const target = serviceList.find((s) => s.name === serviceName);
          if (target) {
            target.count += count;
          }
        }
      }
    }

    return Object.entries(output).map(([regionCode, services]) => ({
      regionCode,
      services,
    }));
  }
}
