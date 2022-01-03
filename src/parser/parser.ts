import P from 'parsimmon'

const transactionTypes = ['доходы', 'затраты']
const categoriesByTransactionType = {
    доходы: ['зарплата'],
    затраты: ['продукты', 'автомобиль', 'жилье'],
}

export const TransactionParser = P.createLanguage({
    category: () =>
        P.alt(
            ...[
                ...categoriesByTransactionType.доходы,
                ...categoriesByTransactionType.затраты,
            ].map(P.string)
        ),
})
