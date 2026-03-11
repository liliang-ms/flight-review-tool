import React from 'react';
import { Card, Text, makeStyles, tokens } from '@fluentui/react-components';
import type { Flight } from '../types/Flight';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  },
  card: {
    padding: '16px',
    cursor: 'default',
  },
  label: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '8px',
    display: 'block',
  },
  count: {
    fontSize: '32px',
    fontWeight: '700',
    lineHeight: '1',
    display: 'block',
  },
  countTotal: {
    color: tokens.colorNeutralForeground1,
  },
  countRunning: {
    color: tokens.colorPaletteGreenForeground1,
  },
  countCompleted: {
    color: tokens.colorBrandForeground1,
  },
  countPending: {
    color: tokens.colorPaletteYellowForeground2,
  },
});

interface SummaryCardsProps {
  flights: Flight[];
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ flights }) => {
  const styles = useStyles();
  const running = flights.filter((f) => f.status === 'Running').length;
  const completed = flights.filter((f) => f.status === 'Completed').length;
  const pending = flights.filter((f) => f.status === 'Pending Review').length;

  const cards = [
    { label: 'Total Flights', count: flights.length, countStyle: styles.countTotal },
    { label: 'Running', count: running, countStyle: styles.countRunning },
    { label: 'Completed', count: completed, countStyle: styles.countCompleted },
    { label: 'Pending Review', count: pending, countStyle: styles.countPending },
  ];

  return (
    <div className={styles.container}>
      {cards.map((card) => (
        <Card key={card.label} className={styles.card}>
          <Text className={styles.label}>{card.label}</Text>
          <Text className={`${styles.count} ${card.countStyle}`}>{card.count}</Text>
        </Card>
      ))}
    </div>
  );
};

export default SummaryCards;
