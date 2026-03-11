import React from 'react';
import { Divider, Text, makeStyles, tokens } from '@fluentui/react-components';
import FilterPanel from './FilterPanel';
import type { ActiveFilters } from './FilterPanel';
import MetricsSelector from './MetricsSelector';
import type { MetricKey } from './MetricsSelector';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  sectionHeader: {
    fontWeight: '600',
    fontSize: '14px',
    color: tokens.colorNeutralForeground1,
    marginBottom: '8px',
  },
});

interface RightPaneProps {
  filters: ActiveFilters;
  onFiltersChange: (filters: ActiveFilters) => void;
  selectedMetrics: MetricKey[];
  onMetricsChange: (metrics: MetricKey[]) => void;
}

const RightPane: React.FC<RightPaneProps> = ({
  filters,
  onFiltersChange,
  selectedMetrics,
  onMetricsChange,
}) => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div>
        <Text className={styles.sectionHeader}>Filters</Text>
        <FilterPanel filters={filters} onChange={onFiltersChange} />
      </div>
      <Divider />
      <div>
        <Text className={styles.sectionHeader}>Metrics</Text>
        <MetricsSelector selectedMetrics={selectedMetrics} onChange={onMetricsChange} />
      </div>
    </div>
  );
};

export default RightPane;
