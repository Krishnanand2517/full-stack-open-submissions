import { useState } from "react";

import Search from "./components/Search";
import ContactForm from "./components/ContactForm";
import Contact from "./components/Contact";

const App = () => {
  const [persons, setPersons] = useState([
  { name: 'Arto Hellas', phone: '040-123456', id: 1 },
  { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const [newFilter, setNewFilter] = useState('');

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
      alert(`${newName} is already added to the phonebook.`);
      return;
    }

    setPersons(persons.concat(person));
    setNewName('');
    setNewNumber('');
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
      <Contact contactList={personsToShow} />
    </div>
  );
};

export default App;
