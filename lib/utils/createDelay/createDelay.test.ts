import { createDelay } from "./index";

describe("promiseDelay", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test("should resolve after timeout has elapsed", async () => {
    const spy = jest.fn();
    createDelay(1000).then(spy); // <= resolve after 100ms

    jest.advanceTimersByTime(200); // <= advance less than 100ms
    await Promise.resolve(); // let any pending callbacks in PromiseJobs run
    expect(spy).not.toHaveBeenCalled(); // SUCCESS

    jest.advanceTimersByTime(800); // <= advance the rest of the time
    await Promise.resolve(); // let any pending callbacks in PromiseJobs run

    expect(spy).toHaveBeenCalled(); // SUCCESS
  });

  it("should abort the delay when AbortSignal is aborted", async () => {
    const abortController = new AbortController();
    const delay = createDelay(1000, abortController.signal);

    jest.advanceTimersByTime(500);
    abortController.abort();
    await expect(delay).rejects.toStrictEqual(
      new Error(abortController.signal.reason),
    );
  });
});
