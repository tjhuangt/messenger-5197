import { should, use, request } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

should();
use(chaiHttp);

let conversationId = 1;
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMwMjg0MDUxLCJleHAiOjE2MzAzNzA0NTF9.leiNE5tetQ1R2XTpNTPD5cYV3DdKwj7lESZ9DT92Q9Y';

describe("/api/messages/id", () => {
  it("it should return 401", done => {
    request(app)
      .put(`/api/messages/` + conversationId)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it("it should return 404", done => {
    request(app)
      .put(`/api/messages`)
      .headers({'x-access-token': token})
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it("it should return 400", done => {
    request(app)
      .put(`/api/messages/id1`)
      .headers({'x-access-token': token})
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it("it should return 200", done => {
    request(app)
      .put(`/api/messages/` + conversationId)
      .headers({'x-access-token': token})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.equal("{\"updateNumber\":[3]}")
        done();
      });
  });
});
