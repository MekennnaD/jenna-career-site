const usd = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	maximumFractionDigits: 0
});

/** $101,190 */
export function money(value: number): string {
	return usd.format(value);
}

/** $101k — for axis labels and other tight spaces. */
export function moneyShort(value: number): string {
	return `$${Math.round(value / 1000)}k`;
}
