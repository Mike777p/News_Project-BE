const { articleData, commentData, topicData, userData } = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const app = require("../app");
const connection = require("../db/connection");
const request = require("supertest");

beforeEach(()=>{
    return seed({topicData, commentData, articleData, userData })
});

afterAll(()=>{
    return connection.end();
});

describe("app", ()=>{
    describe.only("/api/topics", ()=>{
        test("200 : Responds with all topics in db", ()=>{
            return request(app).get("/api/topics")
            .expect(200)
            .then(({body})=>{
                // console.log(body)
                expect(body).toBeInstanceOf(Array);
                expect(body).toHaveLength(3);
                body.forEach((obj)=>{
                    expect(obj).toMatchObject({
                        slug: expect.any(String),
                        description: expect.any(String)
                    })
                })
                })
            })
        })
    })
