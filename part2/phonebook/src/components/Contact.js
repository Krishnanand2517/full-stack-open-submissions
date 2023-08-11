const Person = ({ contactObj, deleteContact }) => (
    <p>
        {contactObj.name} {contactObj.phone}
        <button onClick={deleteContact}>delete</button>
    </p>
);

const Contact = ({ contactList, deleteContactOf }) => (
    <div>
        {contactList.map(contactObj =>
            <Person
                key={contactObj.name}
                contactObj={contactObj}
                deleteContact={() => deleteContactOf(contactObj.id)}
            />
        )}
    </div>
);

export default Contact;