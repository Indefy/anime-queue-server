const expect = require("chai").expect;
const User = require("./User"); // Ensure correct path to User model

describe("User model tests", () => {
	it("should be invalid if username is empty", (done) => {
		const user = new User();

		user.validate((err) => {
			expect(err.errors.username).to.exist;
			done();
		});
	});
});
