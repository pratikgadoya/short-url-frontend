import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  generateUrl(obj) {
    const url = environment.baseUrl + 'short-url';
    return this.httpClient.post(url, obj);
  }
}
