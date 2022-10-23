import { helloWorld } from "../../src/services/exampleService";

test("Initial test", async () => {
  const result = await helloWorld();

  expect(result).toBe("Hello World");
});
