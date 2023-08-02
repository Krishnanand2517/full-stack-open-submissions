import { useState } from 'react';

const Display = ({ anecdotes, selected }) => (
  <div>
    <h1>Anecdote of the Day</h1>
    <p>{anecdotes[selected]}</p>
  </div>
);

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Votes = ({ votes, selected }) => (
  <div>
    <p>This has {votes[selected]} votes.</p>
  </div>
);

const MaxVotesAnecdote = ({ votes, anecdotes }) => {
  const maxIndex = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxIndex]}</p>
      <p>({votes[maxIndex]} votes)</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
   
  const [selected, setSelected] = useState(0);
  const [ votes, setVotes ] = useState(Array(8).fill(0));

  console.log(votes);

  const handleVoteClick = () => {
    const points = [...votes];
    points[selected]++;

    setVotes(points);
  };

  const handleNextClick = () => {
    let nextIndex = Math.floor(Math.random() * 8);

    // To prevent same index from coming again
    while (nextIndex === selected) {
      console.log(nextIndex);
      nextIndex = Math.floor(Math.random() * 8);
    }

    console.log(nextIndex);
    setSelected(nextIndex);
  };

  return (
    <div>
      <Display anecdotes={anecdotes} selected={selected} />
      <Button handleClick={handleVoteClick} text="Vote" />
      <Button handleClick={handleNextClick} text="Next anecdote" />
      <Votes votes={votes} selected={selected} />
      <MaxVotesAnecdote votes={votes} anecdotes={anecdotes} />
    </div>
  );
};

export default App;
