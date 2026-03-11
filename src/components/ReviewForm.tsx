import React, { useState } from 'react';
import {
  Button,
  Textarea,
  Text,
  makeStyles,
  tokens,
  RadioGroup,
  Radio,
  Label,
} from '@fluentui/react-components';
import type { Flight, ReviewDecision } from '../types/Flight';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: '8px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  title: {
    fontWeight: '600',
    fontSize: '16px',
    color: tokens.colorNeutralForeground1,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontWeight: '500',
    fontSize: '13px',
    color: tokens.colorNeutralForeground2,
  },
  actions: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'flex-end',
    paddingTop: '8px',
  },
  existingReview: {
    padding: '12px',
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: '6px',
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    fontSize: '13px',
    color: tokens.colorNeutralForeground2,
  },
});

const decisionOptions: { value: ReviewDecision; label: string }[] = [
  { value: 'dont-ship', label: "Don't Ship" },
  { value: 'need-more-info', label: 'Need More Info' },
  { value: 'ship-with-exception', label: 'Ship with Exception' },
  { value: 'ship', label: 'Ship' },
];

interface ReviewFormProps {
  flight: Flight;
  onSubmit: (decision: ReviewDecision, feedback: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ flight, onSubmit }) => {
  const styles = useStyles();
  const [decision, setDecision] = useState<ReviewDecision>(flight.reviewDecision ?? 'ship');
  const [feedback, setFeedback] = useState(flight.reviewerFeedback ?? '');

  const handleSubmit = () => {
    onSubmit(decision, feedback);
  };

  return (
    <div className={styles.container}>
      <Text className={styles.title}>Reviewer Decision</Text>
      {flight.reviewedBy && (
        <div className={styles.existingReview}>
          Previously reviewed by <strong>{flight.reviewedBy}</strong> on{' '}
          {new Date(flight.reviewedAt!).toLocaleDateString()}
        </div>
      )}
      <div className={styles.field}>
        <Label className={styles.label}>Decision</Label>
        <RadioGroup
          value={decision}
          onChange={(_, data) => setDecision(data.value as ReviewDecision)}
        >
          {decisionOptions.map((opt) => (
            <Radio key={opt.value} value={opt.value} label={opt.label} />
          ))}
        </RadioGroup>
      </div>
      <div className={styles.field}>
        <Label htmlFor="feedback" className={styles.label}>
          Feedback
        </Label>
        <Textarea
          id="feedback"
          value={feedback}
          onChange={(_, data) => setFeedback(data.value)}
          placeholder="Provide detailed feedback for the flight owner..."
          rows={5}
          resize="vertical"
        />
      </div>
      <div className={styles.actions}>
        <Button
          appearance="primary"
          onClick={handleSubmit}
          disabled={!feedback.trim()}
        >
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default ReviewForm;
