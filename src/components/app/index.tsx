import { useEffect, useState } from 'react';
import { AppHeader } from '../app-header/app-header';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerIngredient } from '../../models';
import styles from './app.module.scss'

const ApiUrl: string = "https://norma.nomoreparties.space/api/ingredients";

export const App = () => {
  const [data, setData] = useState<BurgerIngredient[]>([]);

  useEffect(() => {
    fetch(ApiUrl)
      .then(x => {
        if (x.ok) {
          return x.json();
        }

        return Promise.reject(`Ошибка ${x.status}`)
      })
      .then(x => setData(x.data))
      .catch(console.error);
  }, [])

  return (
    <div className='page'>
      <AppHeader />
      <main className={styles.main}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data.filter(x => x.type !== 'bun')} />
      </main>
    </div>
  );
};
