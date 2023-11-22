import { useState } from "react";
import { ALL_AUTHORS, EDIT_BORN } from "../queries";
import { useMutation } from "@apollo/client";
import Select from "react-select";

const AuthorBirth = ({ names }) => {
  const [changeBornYear] = useMutation(EDIT_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const [name, setName] = useState("");
  const [bornYear, setBornYear] = useState(1995);

  const options = [];

  names.forEach((name) => {
    options.push({
      value: name,
      label: name,
    });
  });

  const submit = (event) => {
    event.preventDefault();

    changeBornYear({ variables: { name, setBornTo: parseInt(bornYear) } });

    setBornYear(1995);
  };

  return (
    <div>
      <h2>set birth year</h2>
      <form onSubmit={submit}>
        {/* <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div> */}
        <div style={{ width: 512 }}>
          <Select
            options={options}
            onChange={(option) => setName(option.value)}
          />
        </div>
        <div>
          born{" "}
          <input
            type="number"
            value={bornYear}
            onChange={({ target }) => setBornYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default AuthorBirth;
