import React from 'react';
import { makeStyles, tokens, Text } from '@fluentui/react-components';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  GridRegular,
  ClipboardTaskListLtrRegular,
  SettingsRegular,
} from '@fluentui/react-icons';

const useStyles = makeStyles({
  nav: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: '0',
  },
  header: {
    padding: '16px 20px',
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorBrandBackground,
  },
  headerText: {
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: '600',
    fontSize: '14px',
  },
  navList: {
    listStyle: 'none',
    padding: '8px 0',
    flex: 1,
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 20px',
    cursor: 'pointer',
    color: tokens.colorNeutralForeground2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
      color: tokens.colorNeutralForeground1,
    },
    transition: 'background-color 0.1s',
  },
  navItemActive: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    fontWeight: '600',
    ':hover': {
      backgroundColor: tokens.colorBrandBackground2Hover,
    },
  },
  navIcon: {
    fontSize: '18px',
    flexShrink: 0,
  },
  navLabel: {
    fontSize: '14px',
  },
});

const navItems = [
  { label: 'Dashboard', icon: <GridRegular />, path: '/' },
  { label: 'My Reviews', icon: <ClipboardTaskListLtrRegular />, path: '/my-reviews' },
  { label: 'Settings', icon: <SettingsRegular />, path: '/settings' },
];

const LeftNav: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={styles.nav}>
      <div className={styles.header}>
        <Text className={styles.headerText}>Flight Review Tool</Text>
      </div>
      <ul className={styles.navList}>
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === '/' && location.pathname.startsWith('/flight'));
          return (
            <li
              key={item.label}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <Text className={styles.navLabel}>{item.label}</Text>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LeftNav;
