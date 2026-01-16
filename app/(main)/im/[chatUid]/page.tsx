import DialogScreen from './ui/DialogScreen';

export default function DialogPage({
	params
}: {
	params: { chatUid: string };
}) {
	return <DialogScreen chatUid={params.chatUid} />;
}
