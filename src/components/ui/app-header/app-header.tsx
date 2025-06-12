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
};


export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath, PATHS.CONSTRUCTOR);
  return (<header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <Link
            className={clsx(`text text_type_main-default ml-2 mr-10 ${styles.link}`, currentPath === PATHS.CONSTRUCTOR ? styles.link_active : '')}
            to={'/'}
          >
            Конструктор
          </Link>
        </>
        <>
          <ListIcon type={'primary'} />
          <Link
            className={clsx(`text text_type_main-default ml-2 ${styles.link}`, currentPath === PATHS.FEED ? styles.link_active : '')}
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
        <ProfileIcon type={'primary'} />
        <Link
          className={`text text_type_main-default ml-2 ${styles.link}`}
          to='/profile'
        >
          {userName || 'Личный кабинет'}
        </Link>
      </div>
    </nav>
  </header>)
};
