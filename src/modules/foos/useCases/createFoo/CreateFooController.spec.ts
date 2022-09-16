import { app } from 'shared/infra/http/app'
import request from 'supertest'

const appRequest = request(app)

describe('Create Foo Controller', () => {

    it('should response with 201', async () => {
        const response = await appRequest.post('/v1/foos').send({
            name: "Supertest"
        })
        expect(response.status).toBe(201)
    })

    it('should response with 400 when trying to save duplicated foo', async () => {
        await appRequest.post('/v1/foos').send({
            name: "Supertest"
        })
        const response = await appRequest.post('/v1/foos').send({
            name: "Supertest"
        })
        expect(response.status).toBe(400)
    })
})