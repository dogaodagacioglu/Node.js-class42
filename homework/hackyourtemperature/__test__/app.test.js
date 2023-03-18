import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("should respond with a success message if the city is found", () => {
  it("It should respond with a 200 status code", async () => {
    const response = await request.post("/weather").send({
      city: "Boston",
    });
    expect(response.statusCode).toBe(200);
  });

  it("should specify json in the content type header", async () => {
    const response = await request.post("/weather").send({ city: "Boston" });
    expect(response.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});

// Bad scenarios

describe("should respond with an error message if the city is not found", () => {
  it("It should respond with a negative message if city is wrong", async () => {
    const response = await request.post("/weather").send({
      city: "MissingCity",
    });
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("It should respond with a 400 status code if city is missing", async () => {
    const response = await request.post("/weather").send({
      city: "",
    });
    expect(response.statusCode).toBe(400);
  });
});
