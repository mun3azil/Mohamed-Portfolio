'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { getStoredAnalyticsEvents } from '@/lib/analytics';

type MetricCard = {
  label: string;
  value: string;
  trend: string;
};

type DayBucket = {
  label: string;
  visits: number;
  step1: number;
  step2: number;
  dropoff: number;
};

function percent(numerator: number, denominator: number): number {
  if (!denominator) return 0;
  return (numerator / denominator) * 100;
}

function fmtPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function dayLabel(date: Date): string {
  return date.toLocaleDateString(undefined, { weekday: 'short' });
}

export function FunnelDashboard() {
  const { cards, trend, insights, mappingValidation } = useMemo(() => {
    const events = getStoredAnalyticsEvents();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const last7Days: DayBucket[] = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));

      return {
        label: dayLabel(d),
        visits: 0,
        step1: 0,
        step2: 0,
        dropoff: 0,
      };
    });

    const bucketByDay = new Map<string, DayBucket>();
    last7Days.forEach((bucket, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      bucketByDay.set(dayKey(d), bucket);
    });

    for (const entry of events) {
      const key = dayKey(new Date(entry.timestamp));
      const bucket = bucketByDay.get(key);
      if (!bucket) continue;

      if (entry.event === 'contact_page_visit') bucket.visits += 1;
      if (entry.event === 'step1_submit') bucket.step1 += 1;
      if (entry.event === 'step2_submit') bucket.step2 += 1;
      if (entry.event === 'contact_funnel_dropoff') bucket.dropoff += 1;
    }

    const totals = last7Days.reduce(
      (acc, day) => {
        acc.visits += day.visits;
        acc.step1 += day.step1;
        acc.step2 += day.step2;
        acc.dropoff += day.dropoff;
        return acc;
      },
      { visits: 0, step1: 0, step2: 0, dropoff: 0 },
    );

    const step1Rate = percent(totals.step1, totals.visits);
    const step2Rate = percent(totals.step2, totals.step1);
    const dropoffRate = percent(totals.dropoff, totals.step1);
    const totalRate = percent(totals.step2, totals.visits);

    const first3 = last7Days.slice(0, 3).reduce(
      (acc, d) => ({
        visits: acc.visits + d.visits,
        step1: acc.step1 + d.step1,
        step2: acc.step2 + d.step2,
        dropoff: acc.dropoff + d.dropoff,
      }),
      { visits: 0, step1: 0, step2: 0, dropoff: 0 },
    );

    const last3 = last7Days.slice(4).reduce(
      (acc, d) => ({
        visits: acc.visits + d.visits,
        step1: acc.step1 + d.step1,
        step2: acc.step2 + d.step2,
        dropoff: acc.dropoff + d.dropoff,
      }),
      { visits: 0, step1: 0, step2: 0, dropoff: 0 },
    );

    const cards: MetricCard[] = [
      {
        label: 'Step 1 Conversion Rate',
        value: fmtPercent(step1Rate),
        trend: `${fmtPercent(percent(last3.step1, last3.visits))} vs ${fmtPercent(percent(first3.step1, first3.visits))}`,
      },
      {
        label: 'Step 2 Conversion Rate',
        value: fmtPercent(step2Rate),
        trend: `${fmtPercent(percent(last3.step2, last3.step1))} vs ${fmtPercent(percent(first3.step2, first3.step1))}`,
      },
      {
        label: 'Drop-off Rate',
        value: fmtPercent(dropoffRate),
        trend: `${fmtPercent(percent(last3.dropoff, last3.step1))} vs ${fmtPercent(percent(first3.dropoff, first3.step1))}`,
      },
      {
        label: 'Total Conversion Rate',
        value: fmtPercent(totalRate),
        trend: `${fmtPercent(percent(last3.step2, last3.visits))} vs ${fmtPercent(percent(first3.step2, first3.visits))}`,
      },
    ];

    const step1Dropoff = Math.max(0, totals.step1 - totals.step2);
    const dropoffCandidates = [
      { step: 'Visit → Step 1', count: Math.max(0, totals.visits - totals.step1), rate: 100 - step1Rate },
      { step: 'Step 1 → Step 2', count: step1Dropoff, rate: 100 - step2Rate },
    ];
    const biggestDrop = dropoffCandidates.reduce((prev, cur) => (cur.count > prev.count ? cur : prev), dropoffCandidates[0]);
    const weakestStep = dropoffCandidates.reduce((prev, cur) => (cur.rate > prev.rate ? cur : prev), dropoffCandidates[0]);

    const insights = {
      biggestDropoff: `${biggestDrop.step} (${biggestDrop.count} users)` ,
      weakestStep: `${weakestStep.step} (${fmtPercent(weakestStep.rate)} loss)`,
    };

    const mappingValidation = {
      visitsEvent: 'contact_page_visit',
      step1Event: 'step1_submit',
      step2Event: 'step2_submit',
      dropoffEvent: 'contact_funnel_dropoff',
      totalEventsConsidered: events.length,
      window: 'Last 7 days',
    };

    return { cards, trend: last7Days, insights, mappingValidation };
  }, []);

  return (
    <Container className="py-10 space-y-8">
      <Heading
        title="Funnel Analytics"
        subtitle="Live conversion metrics from contact funnel events (last 7 days)."
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <p className="text-sm text-[var(--color-text-muted)]">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold">{card.value}</p>
            <p className="mt-2 text-xs text-[var(--color-text-muted)]">Trend (last 3d vs first 3d): {card.trend}</p>
          </Card>
        ))}
      </section>

      <Card>
        <h3 className="text-lg font-semibold">7-Day Trend</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[var(--color-text-muted)]">
                <th className="py-2">Day</th>
                <th className="py-2">Visits</th>
                <th className="py-2">Step 1</th>
                <th className="py-2">Step 2</th>
                <th className="py-2">Drop-off</th>
              </tr>
            </thead>
            <tbody>
              {trend.map((day) => (
                <tr key={day.label} className="border-t border-[var(--color-border)]">
                  <td className="py-2">{day.label}</td>
                  <td className="py-2">{day.visits}</td>
                  <td className="py-2">{day.step1}</td>
                  <td className="py-2">{day.step2}</td>
                  <td className="py-2">{day.dropoff}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <h3 className="text-lg font-semibold">Insights</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            <li><strong>Biggest drop-off:</strong> {insights.biggestDropoff}</li>
            <li><strong>Weakest step:</strong> {insights.weakestStep}</li>
          </ul>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold">Validation</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
            <li>Visits mapped from: <code>{mappingValidation.visitsEvent}</code></li>
            <li>Step 1 mapped from: <code>{mappingValidation.step1Event}</code></li>
            <li>Step 2 mapped from: <code>{mappingValidation.step2Event}</code></li>
            <li>Drop-off mapped from: <code>{mappingValidation.dropoffEvent}</code></li>
            <li>Window: {mappingValidation.window}</li>
            <li>Total stored events available: {mappingValidation.totalEventsConsidered}</li>
          </ul>
        </Card>
      </section>
    </Container>
  );
}
