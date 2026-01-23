import { classNames } from '@/shared/lib/classNames/classNames';
import {
	FontWeight,
	Text,
	TextAlign,
	TextColor,
	TextSize,
	TextTag,
	TextType
} from '@/shared/ui/Text';
import Tooltip from '@/shared/ui/Tooltip/ui/Tooltip';
import { InfoCircle } from '@icons/index';
import styles from './TooltipWrapper.module.scss';

export default function TooltipWrapper({
	parentClass
}: {
	parentClass?: string;
}) {
	return (
		<div className={classNames(styles.tooltipWrapper, {}, [parentClass])}>
			<Text
				type={TextType.TEXT}
				tag={TextTag.P}
				fontSize={TextSize.L}
				fontWeight={FontWeight.MEDIUM}
				textAlign={TextAlign.CENTER}
				color={TextColor.BLACK}
				className={classNames(
					`${styles.tooltipText} ${styles.boldText}`,
					{},
					[]
				)}
			>
				Введите код
			</Text>

			<InfoCircle width={24} height={24} className={styles.tooltipIcon} />
			<Tooltip parentClass={styles.tooltip} />
		</div>
	);
}
