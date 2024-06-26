import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Dispatch, SetStateAction, useRef, useState } from 'react';

import {
	defaultArticleState,
	fontSizeOptions,
	AppState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { buttonTitles, defaultTitles } from './ArticleParamsForm.consts';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsProps = {
	title: string;
	appState: AppState;
	setAppState: Dispatch<SetStateAction<AppState>>;
};

export const ArticleParamsForm = ({
	title,
	appState,
	setAppState,
}: ArticleParamsProps) => {
	const modalRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const [articleFormState, setArticleFormState] = useState(appState);

	useOutsideClickClose({
		isOpen,
		rootRef: modalRef,
		onClose: () => setIsOpen(false),
	});

	const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setAppState(articleFormState);
		setIsOpen(false);
	};

	const onFormReset = () => {
		setArticleFormState(defaultArticleState);
		setIsOpen(false);
	};

	return (
		<div ref={modalRef}>
			<ArrowButton
				onClick={() => setIsOpen((isOpen: boolean) => !isOpen)}
				isOpen={isOpen}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => onFormSubmit(e)}
					onReset={() => onFormReset()}>
					<Text as='h2' size={31} weight={800} uppercase family='open-sans'>
						{title}
					</Text>
					<Select
						title={defaultTitles.fontTitle}
						options={fontFamilyOptions}
						selected={articleFormState.fontFamilyOption}
						onChange={(fontFamilyOption) =>
							setArticleFormState({ ...articleFormState, fontFamilyOption })
						}
					/>
					<RadioGroup
						title={defaultTitles.fontSizeTitle}
						options={fontSizeOptions}
						name={'fontSize'}
						selected={articleFormState.fontSizeOption}
						onChange={(fontSizeOption) =>
							setArticleFormState({ ...articleFormState, fontSizeOption })
						}
					/>
					<Select
						title={defaultTitles.fontColorTitle}
						options={fontColors}
						selected={articleFormState.fontColor}
						onChange={(fontColor) =>
							setArticleFormState({ ...articleFormState, fontColor })
						}
					/>
					<Separator />
					<Select
						title={defaultTitles.backgroundColorTitle}
						options={backgroundColors}
						selected={articleFormState.backgroundColor}
						onChange={(backgroundColor) =>
							setArticleFormState({ ...articleFormState, backgroundColor })
						}
					/>
					<Select
						title={defaultTitles.backgroundColorTitle}
						options={contentWidthArr}
						selected={articleFormState.contentWidth}
						onChange={(contentWidth) =>
							setArticleFormState({ ...articleFormState, contentWidth })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title={buttonTitles.resetButtonTitle} type='reset' />
						<Button title={buttonTitles.submitButtonTitle} type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
