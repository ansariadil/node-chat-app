const expect = require('expect')
let {generateMessage} = require('./message')

describe('generateMessage', ()=> {
    it('should generate correct messgase object', () => {
        let from = 'jen'
        let text = 'messagessss'
        let message = generateMessage(from, text)

        expect(typeof message.createAt).toBe('number')
        expect(message).toMatchObject({from, text})

        })
    })