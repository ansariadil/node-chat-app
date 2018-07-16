const expect = require('expect')
let {generateMessage, generateLocationMessage} = require('./message')

describe('generateMessage', ()=> {
    it('should generate correct messgase object', () => {
        let from = 'jen'
        let text = 'messagessss'
        let message = generateMessage(from, text)

        expect(typeof message.createAt).toBe('number')
        expect(message).toMatchObject({from, text})

        })
    })

describe('generateLocationMessage', () => {
    it('should generate correct message location', () => {
        let from = 'Adil'
        let latitude =15
        let longitude =30
        let url = 'https://www.google.com/maps?q=15,30'
        let message = generateLocationMessage(from, latitude, longitude)

        expect(typeof message.createAt).toBe('number')
        expect(message).toMatchObject({from, url})

    })
})