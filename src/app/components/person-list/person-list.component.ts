import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Person } from 'src/app/interfaces/person';
import { PersonsService } from 'src/app/services/persons.service';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
})
export class PersonListComponent implements OnInit {
  public state: 'EDIT' | 'ADD' | 'NONE' = 'NONE';

  persons!: Person[];
  personForm: FormGroup;
  selectedPerson!: Person;

  constructor(
    private personService: PersonsService,
    private formBuilder: FormBuilder
  ) {
    this.personForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      profilepic: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.refrechPersons();
  }
  refrechPersons() {
    this.personService.getPersons().subscribe((response: Person[]) => {
      this.persons = response;
      console.log(this.persons);
    });
  }

  editPersonData(person: Person) {
    this.state = 'EDIT';
    this.selectedPerson = person;

    this.personForm.get('email')?.setValue(this.selectedPerson.email);
    this.personForm.get('name')?.setValue(this.selectedPerson.name);
    this.personForm.get('lastname')?.setValue(this.selectedPerson.lastname);
    this.personForm.get('profilepic')?.setValue(this.selectedPerson.profilepic);
  }

  cancelPersonEdition() {
    this.personForm.reset();
    this.selectedPerson = null!;

    this.state = 'NONE';
  }

  updatePerson() {
    if (this.personForm.valid && this.selectedPerson != null) {
      this.selectedPerson.email = this.personForm.get('email')?.value;
      this.selectedPerson.name = this.personForm.get('name')?.value;
      this.selectedPerson.lastname = this.personForm.get('lastname')?.value;
      this.selectedPerson.profilepic = this.personForm.get('profilepic')?.value;

      this.personService.updatePerson(this.selectedPerson).subscribe(() => {
        this.refrechPersons();
      });
    }
    this.state = 'NONE';
  }

  addPerson() {
    if (this.personForm.valid) {
      const email = this.personForm.get('email')?.value;
      const name = this.personForm.get('name')?.value;
      const lastname = this.personForm.get('lastname')?.value;
      const profilepic = this.personForm.get('profilepic')?.value;

      let person: Person = {
        id: '',
        email: email,
        name: name,
        lastname: lastname,
        profilepic: profilepic,
      };

      this.personService.addPerson(person).subscribe(() => {
        this.refrechPersons();
      });

      this.state = 'NONE';
    }
  }

  deletePersonData(person: Person){
    this.personService.detelePerson(person).subscribe(()=> {
      this.refrechPersons();
    })
  }
}
