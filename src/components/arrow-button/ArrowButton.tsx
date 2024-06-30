import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';

import { clsx } from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type ArrowButtonProps = {
	onClick: OnClick;
	isOpen: boolean;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const classNameArrow = clsx(styles.arrow, props.isOpen && styles.arrow_open);
	const classNameButton = clsx(
		styles.container,
		props.isOpen && styles.container_open
	);

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={classNameButton}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={classNameArrow}
				onClick={props.onClick}
			/>
		</div>
	);
};
