import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

const PATHS = {
  CONSTRUCTOR: '/',
  FEED: '/feed',
  PROFILE: '/profile'
};

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const ActiveLinks = {
    activeConstructor:
      currentPath === PATHS.CONSTRUCTOR ? styles.link_active : null,
    activeFeed: currentPath === PATHS.FEED ? styles.link_active : null,
    activeProfile: currentPath === PATHS.PROFILE ? styles.link_active : null
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon
              type={ActiveLinks.activeConstructor ? 'primary' : 'secondary'}
            />
            <Link
              className={clsx(
                `text text_type_main-default ml-2 mr-10 ${styles.link}`,
                ActiveLinks.activeConstructor
              )}
              to={'/'}
            >
              Конструктор
            </Link>
          </>
          <>
            <ListIcon type={ActiveLinks.activeFeed ? 'primary' : 'secondary'} />
            <Link
              className={clsx(
                `text text_type_main-default ml-2 ${styles.link}`,
                ActiveLinks.activeFeed
              )}
              to={'/feed'}
            >
              Лента заказов
            </Link>
          </>
        </div>
        <Link className={styles.logo} to={'/'}>
          <Logo className='' />
        </Link>
        <div className={styles.link_position_last}>
          <ProfileIcon
            type={ActiveLinks.activeProfile ? 'primary' : 'secondary'}
          />
          <Link
            className={clsx(
              `text text_type_main-default ml-2 ${styles.link}`,
              ActiveLinks.activeProfile
            )}
            to='/profile'
          >
            {userName || 'Личный кабинет'}
          </Link>
        </div>
      </nav>
    </header>
  );
};
