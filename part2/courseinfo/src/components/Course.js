const Header = ({ name }) => {
    return (
    <h1>{name}</h1>
    );
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Content = ({ parts }) => (
  <div>
    {
        parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )
    }
  </div>
);

const Total = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) =>
        sum + part.exercises
    , 0);

    return (
        <p><strong>
            Total of {totalExercises} exercises
        </strong></p>
    );
};

const Course = ({ course }) => {
    return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
    );
};

export default Course;