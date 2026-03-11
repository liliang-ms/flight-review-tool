import React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import LeftNav from './LeftNav';

const useStyles = makeStyles({
  shell: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  leftNav: {
    width: '240px',
    minWidth: '240px',
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    overflow: 'hidden',
  },
  main: {
    flex: 1,
    display: 'flex',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    overflow: 'auto',
    padding: '24px',
  },
  rightPane: {
    width: '280px',
    minWidth: '280px',
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground1,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    overflow: 'auto',
    padding: '16px',
  },
});

interface AppShellProps {
  children: React.ReactNode;
  rightPane?: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children, rightPane }) => {
  const styles = useStyles();
  return (
    <div className={styles.shell}>
      <div className={styles.leftNav}>
        <LeftNav />
      </div>
      <div className={styles.main}>
        <div className={styles.content}>{children}</div>
        {rightPane && <div className={styles.rightPane}>{rightPane}</div>}
      </div>
    </div>
  );
};

export default AppShell;
