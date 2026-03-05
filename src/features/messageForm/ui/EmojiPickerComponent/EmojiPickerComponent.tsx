import styles from './EmojiPicker.module.scss';

interface EmojiPickerComponentProps {
	parentClass?: string;
	onEmojiSelect: (emoji: string) => void;
}
export function EmojiPickerComponent({
	onEmojiSelect
}: EmojiPickerComponentProps) {
	return <div>EmojiPicker</div>;
}
