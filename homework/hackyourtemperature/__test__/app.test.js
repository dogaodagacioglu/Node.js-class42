import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("Given a correct city", () => {
  it("It should respond with a 200 status code", async () => {
    const response = await request.post("/weather").send({
      city: "Boston"
    });
    expect(response.statusCode).toBe(200);
  });

  it("should specify json in the content type header", async () => {
    const response = await request
      .post("/weather")
      .send({ city: "Boston"});
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

// Bad scenarios

describe("Given a wrong or missing city ", () => {
  it("It should respond with a negative message if city is wrong", async () => {
    const response = await request.post("/weather").send({
      city: "MissingCity"
    });
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("It should respond with a 404 status code if city is missing", async () => {
    const response = await request.post("/weather").send({
      city: "",
    });
    expect(response.statusCode).toBe(404);
});
})