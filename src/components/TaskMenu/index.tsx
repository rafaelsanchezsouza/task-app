import { useEffect, useState } from 'react';
import { StaticIsLoading } from '../../components/StaticIsLoading';
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

async function handleDelete(task: Task, tasks: Task[]) {
  try {
    await api.delete(`/tasks/${task.id}`);
    // window.location.reload();
  } catch (err) {
    console.log(err);
    alert(err.response.data.message);
  }
}

export function TaskMenu() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([] as Task[]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get('/tasks')
      .then(async (response) => {
        const json = await response.data;
        setTasks(json);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <StaticIsLoading />;
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
            {tasks.map((task: Task) => {
              return (
                <tr key={task.id} className={styles.items}>
                  <td className={styles.checkboxContainer}>
                    <input
                      className={styles.checkbox}
                      type="checkbox"
                      id={`done-${task.id}`}
                      checked={task.done}
                      onChange={() => {
                        setTasks(
                          tasks.map((taskState: Task) => {
                            if (task.id === taskState.id) {
                              taskState.done = !taskState.done;
                            }
                            return taskState;
                          })
                        );
                        api.put(`/tasks/${task.id}`);
                      }}
                    />
                    <span
                      className={styles.checkmark}
                      onClick={() => {
                        setTasks(
                          tasks.map((taskState: Task) => {
                            if (task.id === taskState.id) {
                              taskState.done = !taskState.done;
                            }
                            return taskState;
                          })
                        );
                        api.put(`/tasks/${task.id}`);
                      }}
                    ></span>
                  </td>
                  <td>{task.item}</td>
                  <td>
                    <button
                      className={styles.trashButton}
                      type="button"
                      onClick={() => {
                        handleDelete(task, tasks);
                        setTasks((prevTasks) =>
                          // Filter out the item with the matching index
                          prevTasks.filter(
                            (prevTask) => prevTask.id !== task.id
                          )
                        );
                      }}
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
