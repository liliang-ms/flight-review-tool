import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
  makeStyles,
  tokens,
  Text,
} from '@fluentui/react-components';
import {
  ArrowSortUpRegular,
  ArrowSortDownRegular,
  ArrowSortRegular,
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import type { Flight, FlightStatus } from '../types/Flight';
import type { MetricKey } from './MetricsSelector';
import { METRIC_LABELS } from './MetricsSelector';

const useStyles = makeStyles({
  container: {
    overflowX: 'auto',
    borderRadius: '8px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  table: {
    width: '100%',
    minWidth: '800px',
  },
  headerCell: {
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  flightNameLink: {
    cursor: 'pointer',
    color: tokens.colorBrandForeground1,
    fontWeight: '500',
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  noResults: {
    textAlign: 'center',
    padding: '40px',
    color: tokens.colorNeutralForeground3,
  },
  metricCell: {
    fontVariantNumeric: 'tabular-nums',
    fontSize: '13px',
  },
});

const statusColors: Record<FlightStatus, 'success' | 'informative' | 'warning' | 'severe'> = {
  Running: 'success',
  Completed: 'informative',
  Paused: 'warning',
  'Pending Review': 'severe',
};

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
  column: string;
  direction: SortDirection;
}

interface FlightTableProps {
  flights: Flight[];
  selectedMetrics: MetricKey[];
}

const formatMetric = (key: MetricKey, value: number): string => {
  switch (key) {
    case 'crashRate':
    case 'errorRate':
    case 'retention':
    case 'featureAdoptionRate':
      return `${(value * 100).toFixed(2)}%`;
    case 'latencyP50':
    case 'latencyP99':
      return `${value}ms`;
    case 'dau':
      return value.toLocaleString();
    case 'nps':
      return value.toString();
    default:
      return value.toString();
  }
};

const FlightTable: React.FC<FlightTableProps> = ({ flights, selectedMetrics }) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [sort, setSort] = useState<SortState>({ column: 'id', direction: 'asc' });

  const handleSort = (column: string) => {
    setSort((prev) => ({
      column,
      direction:
        prev.column === column
          ? prev.direction === 'asc'
            ? 'desc'
            : prev.direction === 'desc'
            ? null
            : 'asc'
          : 'asc',
    }));
  };

  const sortedFlights = useMemo(() => {
    if (!sort.direction || !sort.column) return flights;
    return [...flights].sort((a, b) => {
      let aVal: string | number;
      let bVal: string | number;
      if (sort.column.startsWith('metrics.')) {
        const metricKey = sort.column.replace('metrics.', '') as MetricKey;
        aVal = a.metrics[metricKey];
        bVal = b.metrics[metricKey];
      } else {
        aVal = (a as unknown as Record<string, unknown>)[sort.column] as string | number ?? '';
        bVal = (b as unknown as Record<string, unknown>)[sort.column] as string | number ?? '';
      }
      if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [flights, sort]);

  const SortIcon = ({ column }: { column: string }) => {
    if (sort.column !== column || !sort.direction) return <ArrowSortRegular fontSize={14} />;
    return sort.direction === 'asc' ? (
      <ArrowSortUpRegular fontSize={14} />
    ) : (
      <ArrowSortDownRegular fontSize={14} />
    );
  };

  const HeaderCell = ({ column, label }: { column: string; label: string }) => (
    <TableHeaderCell className={styles.headerCell} onClick={() => handleSort(column)}>
      <div className={styles.headerContent}>
        {label}
        <SortIcon column={column} />
      </div>
    </TableHeaderCell>
  );

  if (flights.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.noResults}>
          <Text>No flights match your search or filters.</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Table className={styles.table} sortable>
        <TableHeader>
          <TableRow>
            <HeaderCell column="id" label="Flight ID" />
            <HeaderCell column="name" label="Flight Name" />
            <HeaderCell column="experimentationId" label="Exp ID" />
            <HeaderCell column="status" label="Status" />
            <HeaderCell column="productArea" label="Product Area" />
            <HeaderCell column="team" label="Team" />
            <HeaderCell column="owner" label="Owner" />
            <HeaderCell column="startDate" label="Start Date" />
            <HeaderCell column="endDate" label="End Date" />
            {selectedMetrics.map((metric) => (
              <HeaderCell key={metric} column={`metrics.${metric}`} label={METRIC_LABELS[metric]} />
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedFlights.map((flight) => (
            <TableRow key={flight.id}>
              <TableCell>{flight.id}</TableCell>
              <TableCell>
                <span
                  className={styles.flightNameLink}
                  onClick={() => navigate(`/flight/${flight.id}`)}
                >
                  {flight.name}
                </span>
              </TableCell>
              <TableCell>{flight.experimentationId}</TableCell>
              <TableCell>
                <Badge
                  appearance="tint"
                  color={statusColors[flight.status]}
                  size="medium"
                >
                  {flight.status}
                </Badge>
              </TableCell>
              <TableCell>{flight.productArea}</TableCell>
              <TableCell>{flight.team}</TableCell>
              <TableCell>{flight.owner}</TableCell>
              <TableCell>{flight.startDate}</TableCell>
              <TableCell>{flight.endDate}</TableCell>
              {selectedMetrics.map((metric) => (
                <TableCell key={metric} className={styles.metricCell}>
                  {formatMetric(metric, flight.metrics[metric])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FlightTable;
