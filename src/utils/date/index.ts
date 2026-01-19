export const isoToSimpleDate = (iso: string) => {
	const date = new Date(iso);
	return new Intl.DateTimeFormat('pt-BR').format(date);
};
