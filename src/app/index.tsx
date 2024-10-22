import { useEffect, useState } from 'react';
import { AppHeader } from '../components/app-header/app-header';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';

const ApiUrl: string = "https://norma.nomoreparties.space/api/ingredients";

export const App = () => {
	const [data, setData] = useState([])

	useEffect(() => {
		fetch(ApiUrl)
			.then(x => x.json())
			.then(x => setData(x.data))
	}, [])

	return (
		<div className='page'>
			<AppHeader />
			<main style={{ display: 'flex', gap: 40 }}>
				<div>
					<BurgerIngredients data={data} />
				</div>
				<div>
					<BurgerConstructor data={data.filter((x: any) => x.type !== 'bun')} />
				</div>
			</main>
		</div>
	);
};
