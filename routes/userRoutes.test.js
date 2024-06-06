const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server"); // Correctly point to server.js

chai.use(chaiHttp);

describe("Users", () => {
	it("should register a user", (done) => {
		chai
			.request(server)
			.post("/users/register")
			.send({
				username: "testuser",
				email: "test@example.com",
				password: "123456",
			})
			.end((err, res) => {
				res.should.have.status(201);
				res.body.should.be.a("object");
				res.body.should.have.property("username");
				done();
			});
	});

	it("should login a user", (done) => {
		chai
			.request(server)
			.post("/users/login")
			.send({
				email: "test@example.com",
				password: "123456",
			})
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a("object");
				res.body.should.have.property("token");
				done();
			});
	});
});
