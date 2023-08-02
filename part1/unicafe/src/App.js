import { useState } from "react";

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

// const StatisticLine = ({ measure, text }) => (
//   <p>{text} {measure}</p>
// );

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const score = good - bad;

  if (total === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Statistics</h1>
      {/* <StatisticLine measure={good} text="Good" />
      <StatisticLine measure={neutral} text="Neutral" />
      <StatisticLine measure={bad} text="Bad" />
      <StatisticLine measure={total} text="All" />
      <StatisticLine measure={score / total} text="Average" />
      <StatisticLine measure={good / total} text="Positive %" /> */}

      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{score / total}</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{good / total} %</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  const handleGoodClick = () => {
    console.log("Good! Good Count:", good);
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    console.log("Neutral! Neutral Count:", neutral);
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    console.log("Bad!! Bad Count:", bad);
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
