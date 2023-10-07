import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests';
import { useNotificationDispatch } from './NotificationContext';

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));

      showNotification(`you created new anecdote "${newAnecdote.content}"`);
    },
    onError: (error) => {
      showNotification(`error: too short anecdote! Must have minimum 5 characters`);
    }
  });

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], anecdotes.map(
        anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      ));

      showNotification(`you voted for "${updatedAnecdote.content}"`);
    }
  });

  const showNotification = (content, duration = 5000) => {
    notificationDispatch({ type: 'SHOW', payload: content });

    setTimeout(() => {
      notificationDispatch({ type: 'HIDE' });
    }, duration);
  };

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return <div>Loading anecdotes...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm newAnecdoteMutation={newAnecdoteMutation} />

      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
