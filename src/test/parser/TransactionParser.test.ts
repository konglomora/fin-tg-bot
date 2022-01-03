import { TransactionParser } from '../../parser/parser'
import { deepStrictEqual } from 'assert'

describe('Transaction parser ', () => {
    it('Can parse categories', () => {
        deepStrictEqual(TransactionParser.category.parse('продукты'), {
            status: true,
            value: 'продукты',
        })
        deepStrictEqual(TransactionParser.category.parse('зарплата'), {
            status: true,
            value: 'зарплата',
        })
    })
})
