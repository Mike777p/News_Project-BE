const {
  articleData,
  commentData,
  topicData,
  userData,
} = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const app = require("../app");
const connection = require("../db/connection");
const request = require("supertest");

beforeEach(() => {
  return seed({ topicData, commentData, articleData, userData });
});

afterAll(() => {
  return connection.end();
});

describe("app", () => {
  describe("GET /api/topics", () => {
    test("200 : Responds with all topics in db", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          expect(body).toBeInstanceOf(Array);
          expect(body).toHaveLength(3);
          body.forEach((obj) => {
            expect(obj).toMatchObject({
              slug: expect.any(String),
              description: expect.any(String),
            });
          });
        });
    });
  });
  describe("GET /api/articles", () => {
    test("200: Responds with an array of articles with all keys with added comment count", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeInstanceOf(Array);
          expect(body.articles).toHaveLength(12);
          expect(body.articles).toBeSorted({ descending: true });
          body.articles.forEach((obj) => {
            expect(obj).toMatchObject({
              author: expect.any(String),
              title: expect.any(String),
              article_id: expect.any(Number),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(Number),
            });
          });
        });
    });
    test("404: Path not found", () => {
      return request(app)
        .get("/api/wrongPath")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found");
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("200: Responds with an object article with said ID", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toBeInstanceOf(Object);
          expect(body.article.title).toBe(
            "Living in the shadow of a great man"
          );
          expect(body.article.article_id).toBe(1);
        });
    });
    test("400: Responds with 400 when passed not a number, bad request", () => {
      return request(app)
        .get("/api/articles/a")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("404: Valid article ID but no resource found", () => {
      return request(app)
        .get("/api/articles/300")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Not found");
        });
    });
  });

  describe("GET /api/articles/:article_id/comments", () => {
  test("200: Returns an array of comments of said ID", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeInstanceOf(Array);
        expect(body.comments).toHaveLength(11);
        expect(body.comments).toBeSorted({ descending: true });
        expect(body.comments[0].article_id).toBe(1);
        body.comments.forEach((obj) => {
          expect(obj).toMatchObject({
            author: expect.any(String),
            body: expect.any(String),
            article_id: expect.any(Number),
            created_at: expect.any(String),
            votes: expect.any(Number),
            comment_id: expect.any(Number),
          });
        });
      });
  });
  test("400: Responds with 400 when passed not a number, bad request", () => {
    return request(app)
      .get("/api/articles/a/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("200: Valid article ID but no resource found", () => {
    return request(app)
      .get("/api/articles/300/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toEqual([]);
      });
  });
  });

  describe("POST /api/articles/:article_id/comments", () => {
  test("201: Responds with newly created  object", () => {
    const message = "Random message etc"
    const username = 'lurker'
    const requestBody = {username : username, body : message }
    return request(app)
      .post(`/api/articles/1/comments`)
      .send(requestBody)
      .expect(201)
      .then(({ body }) => {
        expect(body.comment.article_id).toBe(1)
        expect(body.comment.body).toBe(message)
        expect(body.comment.author).toBe(username)
      });
  });
  test("400: Responds with 400 when passed not null values missing etc, bad request", () => {
    const message = "Random message etc"
    const username = 'lurker'
    const requestBody = {username : username, body : message }
    return request(app)
      .post("/api/articles/a/comments")
      .send(requestBody)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad Request");
      });
  });
  test("404: Valid article ID but no resource found", () => {
    const message = "Random message etc"
    const username = 'lurker'
    const requestBody = {username : username, body : message }
    return request(app)
      .post("/api/articles/300/comments")
      .send(requestBody)
      .expect(404)
      .then(({ body }) => {
        expect(body).toEqual([]);
      });
  });
 
  describe("PATCH /api/articles/:article_id", () => {
    test("200: Responds with an updated article_id", () => {
      const votes = 1
      const requestBody = { inc_votes : votes }
      return request(app)
        .patch(`/api/articles/1`)
        .send(requestBody)
        .expect(200)
        .then(({ body }) => {
          expect(body.article.article_id).toBe(1)
          expect(body.article.votes).toBe(101)
        });
    });
    test("200: Responds with an updated article_id Test 2", () => {
      const votes = 5
      const requestBody = { inc_votes : votes }
      return request(app)
        .patch(`/api/articles/1`)
        .send(requestBody)
        .expect(200)
        .then(({ body }) => {
          expect(body.article.article_id).toBe(1)
          expect(body.article.votes).toBe(105)
        });
    });
    test("400: Responds with 400 when passed not null values missing etc, bad request", () => {
      const votes = 1
      const requestBody = { inc_votes : votes }
      return request(app)
        .patch("/api/articles/poodle")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad Request");
        });
    });
    test("404: Valid article ID but no resource found", () => {
      const votes = 1
      const requestBody = { inc_votes : votes }
      return request(app)
        .patch("/api/articles/300")
        .send(requestBody)
        .expect(404)
        .then(({ body }) => {
          expect(body).toEqual({"article": []});
        });
    });
    });
});
describe("GET /api/users", ()=>{
  test("200: Return an array of user objects", ()=> {
    return request(app).get("/api/users")
    .expect(200)
    .then(({ body }) => {
      expect(body.users).toBeInstanceOf(Array);
      body.users.forEach((user)=> {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
      })
    })
  })
  test("404: Path not found", () => {
    return request(app)
      .get("/api/wrongUserPath")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Path not found");
      });
  });
})
});