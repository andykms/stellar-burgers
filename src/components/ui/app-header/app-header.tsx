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

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} />
          <Link
            className={`text text_type_main-default ml-2 mr-10 ${styles.link}`}
            to={'/'}
          >
            Конструктор
          </Link>
        </>
        <>
          <ListIcon type={'primary'} />
          <Link
            className={`text text_type_main-default ml-2 ${styles.link}`}
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
  </header>
);
