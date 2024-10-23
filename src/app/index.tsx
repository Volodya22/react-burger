import { useEffect, useState } from 'react';
import { AppHeader } from '../components/app-header/app-header';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerIngredient } from '../models';

const ApiUrl: string = "https://norma.nomoreparties.space/api/ingredients";

export const App = () => {
	const [data, setData] = useState<BurgerIngredient[]>([])

	useEffect(() => {
		fetch(ApiUrl)
			.then(x => x.json())
			.then(x => setData(x.data))
			.catch(x => console.log(x))
	}, [])

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
