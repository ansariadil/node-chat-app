const expect = require('expect')
const {isRealString} = require('./validation')

describe('isRealString', () => {
    it('should reject non String Values', () => {
        let res = isRealString(98)
        expect(res).toBeFalsy()
    })

    it('should reject string with only spaces', () => {
        let res = isRealString('    ')
        expect(res).toBeFalsy()
    })

    it('should allow string with non-space character', () => {
        let res = isRealString(' Adil ')
        expect(res).toBeTruthy()
    })
})