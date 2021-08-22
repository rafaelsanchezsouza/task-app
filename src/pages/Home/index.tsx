import { FormEvent, useState } from 'react';

import styles from './styles.module.scss';

function onCreateTask(event: FormEvent) {
  event?.preventDefault();
  console.log('Make API Call');
}

export function Home() {
  const [task, setTask] = useState('');
  const [done, setDone] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form className={styles.menu}>
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
      </div>
    </div>
  );
}
