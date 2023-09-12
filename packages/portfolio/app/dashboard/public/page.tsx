'use client';

// import PlotFigure from '@/components/PlotFigure';
import styles from './page.module.css';
import * as Plot from '@observablehq/plot';
// import penguins from './penguins.json';
import { useCountAnalytics, useQueryAnalytics } from '@/hooks/useAnalytics';
import { useEffect, useRef } from 'react';
import { gql, useQuery } from 'urql';

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

export default function PublicDashboard({
  searchParams,
}: {
  searchParams: { visitor?: string };
}) {
  const barChartRef = useRef<HTMLDivElement>(null);
  const pageViewChartRef = useRef<HTMLDivElement>(null);
  // const myEvents = await getMyEvents(searchParams.visitor);
  // const allEvents = await getAllEvents();
  const { result } = useCountAnalytics();
  const { result: pageViews } = useQueryAnalytics({
    fields: [{ name: 'name', value: 'pageView' }],
  });

  useEffect(() => {
    if (result?.data?.countEvents) {
      console.log('got counted events', result.data);

      const plot = Plot.plot({
        marks: [Plot.barY(result.data.countEvents, { x: 'name', y: 'total' })],
        style: {
          background: 'black',
        },
      });
      if (barChartRef.current) {
        console.log(
          'append bar chart now',
          barChartRef,
          barChartRef.current.append
        );
        barChartRef.current.append(plot);
      }
      return () => plot.remove();
    }
  }, [result]);

  useEffect(() => {
    if (pageViews?.data?.analyticsEvents) {
      console.log(`got pageViews`, pageViews.data);
      const plot = Plot.plot({
        marks: [
          Plot.line(pageViews.data.analyticsEvents, {
            x: 'created',
          }),
        ],
        style: {
          background: 'black',
        },
        y: { grid: true },
      });

      if (pageViewChartRef.current) {
        pageViewChartRef.current.append(plot);
      }

      return () => plot.remove();
    }
  }, [pageViews]);

  return (
    <main className={styles.main}>
      This is the Public Dashboard
      <h2>Events by type</h2>
      <div ref={barChartRef} />
      <h2>Page views over time</h2>
      <div ref={pageViewChartRef} />
      {/* <Plot.plot
        marks={[
          Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }),
        ]}
      /> */}
      {/* <PlotFigure
        options={{
          marks: [
            Plot.rectY(allEvents, Plot.binX({ y: 'count' }, { x: 'name' })),
            Plot.ruleY([0]),
          ],
        }}
      /> */}
    </main>
  );
}
