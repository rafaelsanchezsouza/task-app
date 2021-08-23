import { FormEvent, useState } from 'react';
import { useFetch } from '../../customHooks/useFetch';

import styles from './styles.module.scss';

function onCreateTask(event: FormEvent) {
  event?.preventDefault();
  console.log('Make API Call');
}

export function Home() {
  const [task, setTask] = useState('');
  const [done, setDone] = useState(false);

  const { data, error, isLoading } = useFetch('/tasks');

  if (isLoading) {
    return (
      <div className={styles.main}>
        <div className={styles.container}>
          <h1>Carregando</h1>
        </div>
      </div>
    );
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
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.item}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
