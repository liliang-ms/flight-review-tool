import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Text,
  Badge,
  Button,
  makeStyles,
  tokens,
  Divider,
  Link,
  MessageBar,
  MessageBarBody,
} from '@fluentui/react-components';
import { ArrowLeftRegular, OpenRegular } from '@fluentui/react-icons';
import AppShell from '../components/AppShell';
import ReviewForm from '../components/ReviewForm';
import { mockFlights } from '../data/mockData';
import type { Flight, FlightStatus, ReviewDecision } from '../types/Flight';
import { METRIC_LABELS } from '../components/MetricsSelector';
import type { MetricKey } from '../components/MetricsSelector';

const useStyles = makeStyles({
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '24px',
  },
  breadcrumbSep: {
    color: tokens.colorNeutralForeground3,
  },
  header: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: '24px',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: tokens.colorNeutralForeground1,
    display: 'block',
  },
  titleMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  section: {
    marginBottom: '28px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
    marginBottom: '16px',
    display: 'block',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px 32px',
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '8px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  },
  fieldLabel: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    display: 'block',
  },
  fieldValue: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground1,
    display: 'block',
  },
  descriptionBox: {
    padding: '16px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '8px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '14px',
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.6',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '16px',
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '8px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  metricCard: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '12px',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '6px',
  },
  metricLabel: {
    fontSize: '11px',
    color: tokens.colorNeutralForeground3,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.4px',
    display: 'block',
  },
  metricValue: {
    fontSize: '20px',
    fontWeight: '700',
    color: tokens.colorNeutralForeground1,
    fontVariantNumeric: 'tabular-nums',
    display: 'block',
  },
  notFound: {
    textAlign: 'center',
    padding: '60px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    alignItems: 'center',
  },
});

const statusColors: Record<FlightStatus, 'success' | 'informative' | 'warning' | 'severe'> = {
  Running: 'success',
  Completed: 'informative',
  Paused: 'warning',
  'Pending Review': 'severe',
};

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

const FlightDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const styles = useStyles();
  const [flights, setFlights] = useState<Flight[]>(mockFlights);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const flight = flights.find((f) => f.id === id);

  const handleReviewSubmit = (decision: ReviewDecision, feedback: string) => {
    setFlights((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              reviewDecision: decision,
              reviewerFeedback: feedback,
              reviewedBy: 'current.user@microsoft.com',
              reviewedAt: new Date().toISOString(),
            }
          : f
      )
    );
    setReviewSubmitted(true);
  };

  if (!flight) {
    return (
      <AppShell>
        <div className={styles.notFound}>
          <Text>Flight not found.</Text>
          <Button onClick={() => navigate('/')}>Back to Dashboard</Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Button
          appearance="subtle"
          icon={<ArrowLeftRegular />}
          onClick={() => navigate('/')}
          size="small"
        >
          Dashboard
        </Button>
        <Text className={styles.breadcrumbSep}>/</Text>
        <Text>{flight.name}</Text>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Text className={styles.title}>{flight.name}</Text>
          <div className={styles.titleMeta}>
            <Badge appearance="tint" color={statusColors[flight.status]} size="large">
              {flight.status}
            </Badge>
            <Text style={{ fontSize: '13px', color: tokens.colorNeutralForeground3 }}>
              {flight.productArea} · {flight.team}
            </Text>
          </div>
        </div>
      </div>

      <Divider style={{ marginBottom: '24px' }} />

      {/* Flight Details */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Flight Details</Text>
        <div className={styles.grid}>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>Flight ID</Text>
            <Link href={flight.flightUrl} target="_blank" rel="noopener noreferrer">
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                {flight.id} <OpenRegular fontSize={14} />
              </span>
            </Link>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>Experimentation ID</Text>
            <Text className={styles.fieldValue}>{flight.experimentationId}</Text>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>Owner</Text>
            <Text className={styles.fieldValue}>{flight.owner}</Text>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>Product Area</Text>
            <Text className={styles.fieldValue}>{flight.productArea}</Text>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>Team</Text>
            <Text className={styles.fieldValue}>{flight.team}</Text>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>Status</Text>
            <Badge appearance="tint" color={statusColors[flight.status]}>
              {flight.status}
            </Badge>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>Start Date</Text>
            <Text className={styles.fieldValue}>{flight.startDate}</Text>
          </div>
          <div className={styles.field}>
            <Text className={styles.fieldLabel}>End Date</Text>
            <Text className={styles.fieldValue}>{flight.endDate}</Text>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Description</Text>
        <div className={styles.descriptionBox}>{flight.description}</div>
      </div>

      {/* Metrics */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Metrics</Text>
        <div className={styles.metricsGrid}>
          {(Object.keys(flight.metrics) as MetricKey[]).map((key) => (
            <div key={key} className={styles.metricCard}>
              <Text className={styles.metricLabel}>{METRIC_LABELS[key]}</Text>
              <Text className={styles.metricValue}>
                {formatMetric(key, flight.metrics[key])}
              </Text>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      <div className={styles.section}>
        <Text className={styles.sectionTitle}>Review</Text>
        {reviewSubmitted && (
          <MessageBar intent="success" style={{ marginBottom: '16px' }}>
            <MessageBarBody>Review submitted successfully!</MessageBarBody>
          </MessageBar>
        )}
        <ReviewForm flight={flight} onSubmit={handleReviewSubmit} />
      </div>
    </AppShell>
  );
};

export default FlightDetail;
