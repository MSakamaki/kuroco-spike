import { fetchData, use } from './fetch-data';
import styles from './page-tow.module.css';

/* eslint-disable-next-line */
export interface PageTowProps {}

interface News {
  topics_id: number;
  ymd: string;
  subject: string;
}

export function PageTow(props: PageTowProps) {
  const { list, errors } = use<Awaited<ReturnType<typeof fetchData<News>>>>(
    fetchData<News>('https://kf-imsms.g.kuroco.app/rcms-api/3/news')
  );
  console.log(list, errors);

  return (
    <div className={styles['container']}>
      <h1>Welcome to PageTow!</h1>
      {list.map((v) => (
        <div key={v.topics_id}>{v.subject}</div>
      ))}
    </div>
  );
}

export default PageTow;
