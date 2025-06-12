import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink
          className={({ isActive }) =>
            isActive ? clsx(styles.link_active, styles.link) : styles.link
          }
          to={'/'}
        >
          {({ isActive }) => (
            <>
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ml-2 mr-10`}>
                Конструктор
              </p>
            </>
          )}
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? clsx(styles.link_active, styles.link) : styles.link
          }
          to={'/feed'}
        >
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ml-2`}>
                Лента заказов
              </p>
            </>
          )}
        </NavLink>
      </div>
      <Link className={styles.logo} to={'/'}>
        <Logo className='' />
      </Link>
      <div className={styles.link_position_last}>
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link_active} ${styles.link}` : styles.link
          }
          to={'/profile'}
        >
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className={`text text_type_main-default ml-2 `}>
                {userName || 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
