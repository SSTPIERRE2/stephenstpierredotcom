'use client';

// import PlotFigure from '@/components/PlotFigure';
import styles from './page.module.css';
import * as Plot from '@observablehq/plot';
// import penguins from './penguins.json';
import { useQueryAnalytics } from '@/hooks/useAnalytics';
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

// const BarChart = () =>
//   Plot.plot({
//     marks: [
//       Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }),
//     ],
//   });

export default function PublicDashboard({
  searchParams,
}: {
  searchParams: { visitor?: string };
}) {
  const barChartRef = useRef<HTMLDivElement>();
  // const myEvents = await getMyEvents(searchParams.visitor);
  // const allEvents = await getAllEvents();
  const { result } = useQueryAnalytics();

  // {JSON.stringify(allEvents[0])}

  useEffect(() => {
    // const plot = Plot.plot({
    //   marks: [
    //     Plot.dot(penguins, { x: 'culmen_length_mm', y: 'culmen_depth_mm' }),
    //   ],
    // });
    if (result.data) {
      console.log('got some penguins?', result.data);
      const plot = Plot.plot({
        marks: [
          Plot.rectY(
            result.data.analyticsEvents,
            Plot.binX({ y: 'count' }, { x: 'name' })
          ),
          Plot.ruleY([0]),
        ],
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

  return (
    <main className={styles.main}>
      This is the Public Dashboard
      <h2>Penguins scatterplot</h2>
      <div ref={barChartRef} />
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
