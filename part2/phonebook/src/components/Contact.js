const Person = ({ contactObj }) => (
    <p>
        {contactObj.name} {contactObj.phone}
    </p>
);

const Contact = ({ contactList }) => (
    <div>
        {contactList.map(contactObj =>
            <Person key={contactObj.name} contactObj={contactObj} />
        )}
    </div>
);

export default Contact;