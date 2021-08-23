import format from 'date-fns/format';
import enUS from 'date-fns/locale/en-US';
import styles from './styles.module.scss';

export function Header() {
  const currentDate = format(new Date(), 'EEEE, d MMMM', {
    locale: enUS,
  });

  return (
    <header className={styles.headerContainer}>
      <img src="/task.svg" alt="Tasks"></img>

      <p>Task Manager</p>

      <span>{currentDate}</span>
    </header>
  );
}
