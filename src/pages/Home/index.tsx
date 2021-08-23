import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { StaticIsLoading } from '../../components/StaticIsLoading';
import { useFetch } from '../../customHooks/useFetch';
import api from '../../services/api';

import styles from './styles.module.scss';

function onCreateTask(event: FormEvent) {
  event?.preventDefault();
  console.log('Make API Call');
}

async function handleDelete(taskId: number) {
  try {
    await api.delete(`/tasks/${taskId}`);
    window.location.reload();
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
}

export function Home() {
  const { data, error, isLoading } = useFetch('/tasks');

  const [task, setTask] = useState('');
  // const [tasks, setTasks] = useState(data);
  const [done, setDone] = useState(false);

  const history = useHistory();

  if (isLoading) {
    <StaticIsLoading />;
  }

  if (error) {
    return <h1>Deu algum erro...</h1>;
  }

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form className={styles.createTaskForm}>
          <input
            value={task}
            placeholder={'Task'}
            onChange={(event) => setTask(event.target.value)}
          ></input>
          <br></br>

          <div className={styles.buttons}>
            <button onClick={onCreateTask} className={styles.submitButton}>
              Create Task
            </button>
          </div>
        </form>
        <table className={styles.tasksList}>
          <tbody>
            {data.map((task: Task) => {
              return (
                <tr key={task.id} className={styles.items}>
                  <td>{task.id}</td>
                  <td>{task.item}</td>
                  <td>
                    <button
                      className={styles.trashButton}
                      type="button"
                      onClick={() => handleDelete(task.id)}
                    >
                      <img src="/trash.svg" alt="Excluir Empresa" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
