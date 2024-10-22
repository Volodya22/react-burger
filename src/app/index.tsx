import { AppHeader } from '../components/app-header/app-header';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { data } from '../utils/data'

export const App = () => {
	return (
		<div className='page'>
			<AppHeader />
			<main style={{ display: 'flex', gap: 40 }}>
				<div>
					<BurgerIngredients data={data} />
				</div>
				<div>
					<BurgerConstructor data={data.filter(x => x.type !== 'bun')} />
				</div>
			</main>
		</div>
	);
};
