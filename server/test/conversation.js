import { should, use, request } from "chai";
import chaiHttp from "chai-http";
import app from "../app.js";

should();
use(chaiHttp);

let userId = 1;
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMwMjg0MDUxLCJleHAiOjE2MzAzNzA0NTF9.leiNE5tetQ1R2XTpNTPD5cYV3DdKwj7lESZ9DT92Q9Y';
let unread = 3;

describe("/api/conversations", () => {
  it("it should return number of unread messages", done => {
    request(app)
      .put(`/api/conversations?id=` + userId)
      .headers({'x-access-token': token})
      .end((err, res) => {
        res.should.have.status(200);
        res.should.to.be.json;
        res.body.should.be.a('array');
        res.body.should.have
          .property("unread")
          .eql(unread);
        done();
      });
  });
});
