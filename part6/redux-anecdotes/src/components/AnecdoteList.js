import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from './../reducers/anecdoteReducer';

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state);
    const dispatch = useDispatch();

    const vote = (id) => {
        dispatch(voteAction(id));
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnecdoteList;