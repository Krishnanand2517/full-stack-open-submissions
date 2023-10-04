import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer';
import { setNotification, removeNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()));
    });

    const dispatch = useDispatch();

    const vote = (id, content) => {
        dispatch(voteAnecdote(id));
        dispatch(setNotification(`you voted '${content}'`));
        setTimeout(() => {
            dispatch(removeNotification());
        }, 5000);
    };

    const sortByVotes = (a, b) => b.votes - a.votes;

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort(sortByVotes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;