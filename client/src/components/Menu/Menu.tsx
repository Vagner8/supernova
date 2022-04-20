import { useLayoutEffect, useRef, useState } from 'react';
import M, { Sidenav } from 'materialize-css';
import { Link } from 'react-router-dom';
import styles from './Menu.module.sass';

const menu = [
  { title: 'Home', link: 'admin', icon: 'home' },
  { title: 'Hotels', link: 'admin/hotels', icon: 'business' },
  { title: 'Users', link: 'admin/users', icon: 'person' },
  { title: 'Settings', link: 'admin/settings', icon: 'settings' },
];

export function Menu() {
  const ref = useRef<HTMLUListElement>(null);
  const [menuInstance, SetMenuInstance] = useState<Sidenav>();
  useLayoutEffect(() => {
    if (ref.current) {
      const instance = M.Sidenav.init(ref.current);
      SetMenuInstance(instance);
    }
  }, []);

  return (
    <div className={styles.Menu_Component}>
      <nav className={styles.nav}>
        <button
          type="button"
          data-target="slide-out"
          className={`${styles.burger_button} sidenav-trigger`}
        >
          <i className="material-icons">menu</i>
        </button>
      </nav>

      <ul ref={ref} id="slide-out" className={`${styles.ul} sidenav`}>
        {menu.map((item) => {
          const { title, link, icon } = item;
          return (
            <li key={title} className={styles.page}>
              <Link
                onClick={() => menuInstance?.close()}
                className={styles.link}
                to={link}
              >
                <i className={`${styles.icon} material-icons`}>{icon}</i>
                <span className={styles.title}>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
