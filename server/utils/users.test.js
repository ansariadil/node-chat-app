const expect = require('expect')
const {Users} = require('./users')

describe('Users', () => {

    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'naveen',
            room: 'ansari'
        }, {
            id: '2',
            name: 'kapil',
            room: 'DLT'
        }, {
            id: '3',
            name: 'arpit',
            room: 'DLT'
        }]
    })
    
    it('Should Add New user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Adil',
            room: 'ansari'
        }
        
        let resUser = users.addUser(user.id, user.name, user.room)

        expect(users.users).toEqual([user])
    })

    it('should return names of all users of DLT', () => {
        let userList = users.getUserList('DLT')

        expect(userList).toEqual(['kapil', 'arpit'])
    })

    it('should return names of all users of ansari', () => {
        let userList = users.getUserList('ansari')

        expect(userList).toEqual(['naveen'])
    })

    it('should remove a user', () => {
        let userId = '1'
        let user = users.removeUser(userId)

        expect(user.id).toBe(userId)
        expect(users.users.length).toBe(2)
    })

    it('should not remove user', () => {
        let userId = '88'
        let user = users.removeUser(userId)

        expect(user).toBeFalsy()
        expect(users.users.length).toBe(3)
    })

    it('should find a user', () => {
        let userId = '2'
        let user = users.getUser(userId)

        expect(user.id).toBe(userId)
    })

    it('SHould not find a user', () => {
        let userId = '99'
        let user = users.getUser(userId)

        expect(user).toBeFalsy()
    })
})