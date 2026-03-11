import React from 'react';
import {
  Checkbox,
  Text,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { mockFlights } from '../data/mockData';
import type { FlightStatus } from '../types/Flight';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  section: {
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

const statusOptions: FlightStatus[] = ['Running', 'Completed', 'Paused', 'Pending Review'];
const productAreas = [...new Set(mockFlights.map((f) => f.productArea))].sort();
const teams = [...new Set(mockFlights.map((f) => f.team))].sort();

export interface ActiveFilters {
  statuses: string[];
  productAreas: string[];
  teams: string[];
}

interface FilterPanelProps {
  filters: ActiveFilters;
  onChange: (filters: ActiveFilters) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const styles = useStyles();

  const toggle = (key: keyof ActiveFilters, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Status</Text>
        {statusOptions.map((status) => (
          <Checkbox
            key={status}
            checked={filters.statuses.includes(status)}
            onChange={() => toggle('statuses', status)}
            label={<span className={styles.checkboxLabel}>{status}</span>}
          />
        ))}
      </div>
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Product Area</Text>
        {productAreas.map((area) => (
          <Checkbox
            key={area}
            checked={filters.productAreas.includes(area)}
            onChange={() => toggle('productAreas', area)}
            label={<span className={styles.checkboxLabel}>{area}</span>}
          />
        ))}
      </div>
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Team</Text>
        {teams.map((team) => (
          <Checkbox
            key={team}
            checked={filters.teams.includes(team)}
            onChange={() => toggle('teams', team)}
            label={<span className={styles.checkboxLabel}>{team}</span>}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
