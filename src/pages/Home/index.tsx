import { useState } from 'react';
import { StaticIsLoading } from '../../components/StaticIsLoading';
import { useFetch } from '../../customHooks/useFetch';
import api from '../../services/api';

import styles from './styles.module.scss';

async function onCreateTask(task: string) {
  try {
    await api.post(`/tasks`, {
      item: task,
    });
    window.location.reload();
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
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

async function handleChange(taskId: number) {
  try {
    await api.put(`/tasks/${taskId}`);
    window.location.reload();
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
}

export function Home() {
  const { data, error, isLoading } = useFetch('/tasks');

  const [task, setTask] = useState('');

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
          />
          <br></br>

          <div className={styles.buttons}>
            <button
              type="button"
              onClick={() => {
                onCreateTask(task);
              }}
              className={styles.submitButton}
            >
              Create Task
            </button>
          </div>
        </form>
        <table className={styles.tasksList}>
          <tbody>
            {data.map((task: Task) => {
              return (
                <tr key={task.id} className={styles.items}>
                  <td className={styles.checkboxContainer}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      id={`done-${task.id}`}
                      checked={task.done}
                      onChange={() => {
                        handleChange(task.id);
                      }}
                    />
                    <span
                      className={styles.checkmark}
                      onClick={() => {
                        handleChange(task.id);
                      }}
                    ></span>
                  </td>
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
