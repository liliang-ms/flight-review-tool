import React, { useState, useMemo } from 'react';
import { Text, makeStyles, tokens } from '@fluentui/react-components';
import AppShell from '../components/AppShell';
import SummaryCards from '../components/SummaryCards';
import SearchBar from '../components/SearchBar';
import FlightTable from '../components/FlightTable';
import RightPane from '../components/RightPane';
import type { ActiveFilters } from '../components/FilterPanel';
import { DEFAULT_METRICS } from '../components/MetricsSelector';
import type { MetricKey } from '../components/MetricsSelector';
import { mockFlights } from '../data/mockData';

const useStyles = makeStyles({
  pageHeader: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: tokens.colorNeutralForeground1,
    marginBottom: '4px',
    display: 'block',
  },
  subtitle: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground3,
    display: 'block',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  resultCount: {
    fontSize: '13px',
    color: tokens.colorNeutralForeground3,
  },
});

const Dashboard: React.FC = () => {
  const styles = useStyles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState<MetricKey[]>(DEFAULT_METRICS);
  const [filters, setFilters] = useState<ActiveFilters>({
    statuses: [],
    productAreas: [],
    teams: [],
  });

  const filteredFlights = useMemo(() => {
    return mockFlights.filter((flight) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        flight.id.toLowerCase().includes(q) ||
        flight.name.toLowerCase().includes(q) ||
        flight.experimentationId.toLowerCase().includes(q);

      const matchesStatus =
        filters.statuses.length === 0 || filters.statuses.includes(flight.status);

      const matchesProductArea =
        filters.productAreas.length === 0 || filters.productAreas.includes(flight.productArea);

      const matchesTeam =
        filters.teams.length === 0 || filters.teams.includes(flight.team);

      return matchesSearch && matchesStatus && matchesProductArea && matchesTeam;
    });
  }, [searchQuery, filters]);

  const rightPane = (
    <RightPane
      filters={filters}
      onFiltersChange={setFilters}
      selectedMetrics={selectedMetrics}
      onMetricsChange={setSelectedMetrics}
    />
  );

  return (
    <AppShell rightPane={rightPane}>
      <div className={styles.pageHeader}>
        <Text className={styles.title}>Flight Dashboard</Text>
        <Text className={styles.subtitle}>
          Monitor and review feature flights across M365 product areas
        </Text>
      </div>
      <SummaryCards flights={mockFlights} />
      <div className={styles.toolbar}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Text className={styles.resultCount}>
          {filteredFlights.length} of {mockFlights.length} flights
        </Text>
      </div>
      <FlightTable flights={filteredFlights} selectedMetrics={selectedMetrics} />
    </AppShell>
  );
};

export default Dashboard;
