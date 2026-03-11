import React from 'react';
import { Checkbox, Text, makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '4px',
  },
  checkboxLabel: {
    fontSize: '13px',
  },
});

export type MetricKey =
  | 'crashRate'
  | 'errorRate'
  | 'latencyP50'
  | 'latencyP99'
  | 'dau'
  | 'retention'
  | 'nps'
  | 'featureAdoptionRate';

export const METRIC_LABELS: Record<MetricKey, string> = {
  crashRate: 'Crash Rate',
  errorRate: 'Error Rate',
  latencyP50: 'Latency P50',
  latencyP99: 'Latency P99',
  dau: 'DAU',
  retention: 'Retention',
  nps: 'NPS',
  featureAdoptionRate: 'Feature Adoption Rate',
};

export const DEFAULT_METRICS: MetricKey[] = ['crashRate', 'errorRate', 'latencyP50', 'dau'];

interface MetricsSelectorProps {
  selectedMetrics: MetricKey[];
  onChange: (metrics: MetricKey[]) => void;
}

const MetricsSelector: React.FC<MetricsSelectorProps> = ({ selectedMetrics, onChange }) => {
  const styles = useStyles();

  const toggle = (key: MetricKey) => {
    const updated = selectedMetrics.includes(key)
      ? selectedMetrics.filter((m) => m !== key)
      : [...selectedMetrics, key];
    onChange(updated);
  };

  return (
    <div className={styles.container}>
      <Text className={styles.sectionTitle}>Metric Columns</Text>
      {(Object.keys(METRIC_LABELS) as MetricKey[]).map((key) => (
        <Checkbox
          key={key}
          checked={selectedMetrics.includes(key)}
          onChange={() => toggle(key)}
          label={<span className={styles.checkboxLabel}>{METRIC_LABELS[key]}</span>}
        />
      ))}
    </div>
  );
};

export default MetricsSelector;
