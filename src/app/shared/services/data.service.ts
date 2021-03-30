import { Injectable } from '@angular/core';
import { InMemoryDbService } from "angular-in-memory-web-api";
import { OwnerEntity } from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    let owners: OwnerEntity[] = [
      { id: 0, lastName: 'Иванов', firstName: 'Иван', middleName: 'Иванович', cars: [
          { id: 0, stateNumber: 'AК4325PO', brand: 'Ferrari', modelName: 'LaFerrari', dateProduction: 2021 }
        ]
      },
      { id: 1, lastName: 'Петрова', firstName: 'Наталья', middleName: 'Игоревна', cars: [
          { id: 0, stateNumber: 'AX2121HP', brand: 'Hyundai', modelName: 'Accent', dateProduction: 2009 },
          { id: 1, stateNumber: 'ВС7286АЕ', brand: 'KIA', modelName: 'Optima', dateProduction: 2019 }
        ]
      },
      { id: 2, lastName: 'Антонов', firstName: 'Алексей', middleName: 'Сергеевич', cars: [
          { id: 0, stateNumber: 'AM7864KK', brand: 'Lexus', modelName: 'Infinity', dateProduction: 2020 }
        ]
      },
    ];
    return { owners };
  }
}
