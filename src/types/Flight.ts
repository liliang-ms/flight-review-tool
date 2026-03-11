export type FlightStatus = 'Running' | 'Completed' | 'Paused' | 'Pending Review';
export type ReviewDecision = 'dont-ship' | 'need-more-info' | 'ship-with-exception' | 'ship';

export interface FlightMetrics {
  crashRate: number;
  errorRate: number;
  latencyP50: number;
  latencyP99: number;
  dau: number;
  retention: number;
  nps: number;
  featureAdoptionRate: number;
}

export interface Flight {
  id: string;
  name: string;
  experimentationId: string;
  status: FlightStatus;
  productArea: string;
  team: string;
  owner: string;
  startDate: string;
  endDate: string;
  flightUrl: string;
  description: string;
  metrics: FlightMetrics;
  reviewDecision?: ReviewDecision;
  reviewerFeedback?: string;
  reviewedBy?: string;
  reviewedAt?: string;
}
