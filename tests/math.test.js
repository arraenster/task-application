const { calculateTip } = require('../src/math')

test('User should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)

    /*if (total !== 13) {
        throw new Error('Total tip should be 13. Got ' + total)
    }*/
})

test('User should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})