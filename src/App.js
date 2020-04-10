// React and Hooks
import React, {useState, useEffect} from "react";

// styles
import "./styles.css";

// api service
import api from './services/api';

export default function App() {

  // state
  const [repositories, setRepositories] = useState([]);

  // load repositories from api
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {

    // create a repositorie on api
    const res = await api.post('/repositories');

    // get return of response data
    const newRep = res.data;

    // create and set a new value on repositories array
    setRepositories([...repositories, newRep]);
  }

  async function handleRemoveRepository(id) {

    // call the delete method of api
    await api.delete(`/repositories/${id}`);

    // create a new repositories array without the deleted repositorie
    const newReps = repositories.filter(r => r.id !== id);

    // set the new array to the repositories array variable
    setRepositories(newReps);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => (
          <li key={r.id}>
            {r.title}
            <button onClick={() => handleRemoveRepository(r.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}
