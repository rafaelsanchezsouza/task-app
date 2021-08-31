import { Header } from '../../components/Header';
import { TaskMenu } from '../../components/TaskMenu';

import styles from './styles.module.scss';

export function Home() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <Header />
        <TaskMenu />
      </div>
    </div>
  );
}
