const ContactForm = ({ name, number, onNameChange, onNumberChange, addContact }) => (
    <form>
        <div>
            Name: <input value={name} onChange={onNameChange} />
        </div>
        <div>
            Number: <input value={number} onChange={onNumberChange} />
        </div>
        <div>
            <button type="submit" onClick={addContact}>Add</button>
        </div>
    </form>
);

export default ContactForm;