import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Person } from '../interfaces/person';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private httpClient: HttpClient) {}

  public getPersons(): Observable<Person[]> {
    const url: string = environment.baseAPI;

    return this.httpClient.get<Person[]>(url);
  }

  updatePerson(person: Person): Observable<Person> {
    const url: string = environment.baseAPI;
    
    return this.httpClient.put<Person>(`${url}/${person.id}`, person);
  }

  addPerson(person: Person): Observable<Person> {
    const url: string = environment.baseAPI;
    
    return this.httpClient.post<Person>(url ,person);
  }

  public detelePerson(person: Person): Observable<Person>{
    const url: string = environment.baseAPI;
    
    return this.httpClient.delete<Person>(`${url}/${person.id}`);
  }

  public get404Persons():Observable<Person[]>{
    const url: string = environment.baseAPI + '404';
    
    return this.httpClient.get<Person[]>(url);
  }
}
