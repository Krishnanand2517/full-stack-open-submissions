import { useState, useEffect } from "react";
import contactService from "./services/contacts";

import Search from "./components/Search";
import ContactForm from "./components/ContactForm";
import Contact from "./components/Contact";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts);
      });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();

    const person = {
      name: newName,
      phone: newNumber
    };

    if (persons.filter(person => person.name === newName).length > 0) {
      const message = `${newName} is already added to the phonebook. Replace the old number with the new one?`;
      if (!window.confirm(message)) {
        return;
      }

      const oldContact = persons.find(p => p.name === person.name);
      const updatedContact = { ...oldContact, phone: person.phone };

      contactService
        .update(updatedContact.id, updatedContact)
        .then(returnedContact => {
          setPersons(persons.map(p => p.name !== updatedContact.name ? p : returnedContact));
          setNewName('');
          setNewNumber('');
        });

      return;
    }

    contactService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      });
  };

  const deleteContactOf = (id) => {
    const person = persons.find(p => p.id === id);
    if (!window.confirm(`Delete ${person.name}`)) {
      return;
    }

    contactService
      .deleteOne(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id));
      });
  };

  const personsToShow = newFilter ?
  persons.filter(obj =>
    obj.name.toLowerCase().substring(0, newFilter.length) === newFilter.toLowerCase()
  ) :
  persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Search filterValue={newFilter} onFilterChange={handleFilterChange} />

      <h2>Add New Contact</h2>
      <ContactForm
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        addContact={addContact}
      />

      <h2>Numbers</h2>
      <Contact contactList={personsToShow} deleteContactOf={deleteContactOf} />
    </div>
  );
};

export default App;
