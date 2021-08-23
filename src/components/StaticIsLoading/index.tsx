import styles from '../../pages/Home/styles.module.scss';

export function StaticIsLoading() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <form className={styles.createTaskForm}>
          <input value={''} placeholder={'Task'}></input>
          <br></br>

          <div className={styles.buttons}>
            <button className={styles.submitButton}>Create Task</button>
          </div>
        </form>
        <div className={styles.tasksList}>
          <h1>Carregando</h1>
        </div>
      </div>
    </div>
  );
}
