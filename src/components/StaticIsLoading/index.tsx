import styles from '../../components/TaskMenu/styles.module.scss';

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
        <div className={styles.loading}>
          <h1>Loading...</h1>
        </div>
      </div>
    </div>
  );
}
