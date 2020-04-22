import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestParams } from 'src/app/types';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor() {}

  @Injectable({
    providedIn: 'root',
  })
  productsRequest: RequestParams = {
    // obiekt z kryteriami, na podstawie których będziemy szukać produktów
    action: 'getProducts',
    name: '',
    category: '',
  };
  products;
  private apiPath = 'https://jakubadamus.cba.pl/xhr.php?'; // Ścieżka do naszego api

  getProducts(productsRequest) {
    //  Pobiera produkty poprzez API
    const s = new Promise((resolve, reject) => {
      const xhttp = new XMLHttpRequest();
      const SQL =
        'object=' + encodeURIComponent(JSON.stringify(productsRequest));
      console.log(this.apiPath + SQL);
      xhttp.open('GET', this.apiPath + SQL, true);
      xhttp.send();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          const resultObject = JSON.parse(xhttp.responseText);

          if (resultObject !== null) {
            resolve(resultObject);
          } else {
            reject('Failed');
          }
        }
      };
    });
    s.then((onmessage: any) => {
      this.products = onmessage;
      console.log(this.products);
    }).catch((onmessage) => {
      console.log(
        'Coś poszło nie tak podczas wczytywania produktów!',
        onmessage
      );
    });
  }
}