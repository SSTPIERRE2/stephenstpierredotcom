import PlotFigure from '@/components/PlotFigure';
import styles from './page.module.css';
import { AnalyticsEvent } from '@core/analyticsEvent';

// async function getMyEvents(visitorId?: string) {
//   const res = visitorId
//     ? await list([{ name: 'visitor_id', value: visitorId }])
//     : [];
//   return res;
// }

// async function getAllEvents() {
//   const res = await AnalyticsEvent.list();
//   return res;
// }

export default async function PublicDashboard({
  searchParams,
}: {
  searchParams: { visitor?: string };
}) {
  // const myEvents = await getMyEvents(searchParams.visitor);
  // const allEvents = await getAllEvents();

  return <main className={styles.main}>This is the Public Dashboard</main>;
}
