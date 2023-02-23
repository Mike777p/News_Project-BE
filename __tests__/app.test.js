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
  describe("/api/topics", () => {
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
  })
  describe("/api/articles", () => {
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
  describe("/api/articles/:article_id", () => {
    test("200: Responds with an object article with said ID", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toBeInstanceOf(Object);
          expect(body.article.title).toBe(
            "Living in the shadow of a great man"
          );
          expect(body.article.article_id).toBe(1)
        });
    })
    test("400: Responds with 400 when passed not a number, bad request", () => {
      return request(app)
        .get("/api/articles/a")
        .expect(400)
        .then(({ body }) => {
        expect(body.msg).toBe('Bad Request')
    });
  })
  test("404: Valid article ID but no resource found", () => {
    return request(app)
      .get("/api/articles/300")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not found")
     
  });
});
});
});

describe("/api/articles/:article_id/comments", () => {
  test("200: Returns an array of comments of said ID", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        console.log("test", body)
        expect(body.articles).toBeInstanceOf(Array);
        // expect(body.articles).toHaveLength(12);
        // expect(body.articles).toBeSorted({ descending: true });
        // body.articles.forEach((obj) => {
        //   expect(obj).toMatchObject({
        //     author: expect.any(String),
        //     body : expect.any(Srting),
        //     article_id: expect.any(Number),
        //     created_at: expect.any(String),
        //     votes: expect.any(Number),
        //     comment_id: expect.any(Number),
        //   });
        // });
      });
  });
  // test("404: Path not found", () => {
  //   return request(app)
  //     .get("/api/wrongPath")
  //     .expect(404)
  //     .then(({ body }) => {
  //       expect(body.msg).toBe("Path not found");
  //     });
  // });
});