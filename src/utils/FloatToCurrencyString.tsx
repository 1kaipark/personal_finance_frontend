export const FloatToCurrencyString = (amount: number) => {
    return (amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }))
};