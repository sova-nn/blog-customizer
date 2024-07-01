import { CSSProperties, useState } from 'react';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [appState, setAppState] = useState(defaultArticleState);
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': appState.fontFamilyOption.value,
					'--font-size': appState.fontSizeOption.value,
					'--font-color': appState.fontColor.value,
					'--container-width': appState.contentWidth.value,
					'--bg-color': appState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				title='Задайте параметры'
				setAppState={setAppState}
				appState={appState}
			/>
			<Article />
		</main>
	);
};
