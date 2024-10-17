import { useState } from 'react';
import { AppHeader } from '../components/app-header/app-header';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';

export const App = () => {
	// const num = 0
	const [count, setCount] = useState(0);
	return (
		<div className='page'>
			<AppHeader />
			<main style={{ display: 'flex', gap: 40 }}>
				<div>
					<BurgerIngredients />
				</div>
				<div>
					<BurgerConstructor />
				</div>
			</main>
		</div>
	);
};
