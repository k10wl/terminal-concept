import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useThrottle } from "./index";

jest.useFakeTimers();

describe("useThrottle", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it("should return a throttled function", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useThrottle(callback, 1000));

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("function");

    act(() => {
      result.current();
      // ^ first call occurred
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();

    act(() => {
      result.current();
      result.current();
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1000);
      // ^ second call occurred as trailing call
    });

    // Only one trailing call
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenLastCalledWith();

    act(() => {
      result.current();
      // ^ third call occurred
      jest.advanceTimersByTime(500);
      result.current();
      result.current();
      result.current();
      result.current();
      result.current();
      jest.advanceTimersByTime(500);
      // ^ forth call occurred as trailing
    });

    expect(callback).toHaveBeenCalledTimes(4);

    jest.clearAllTimers();
  });

  it("should return a throttled function with leading option disabled", () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useThrottle(callback, 1000, { leading: false }),
    );

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("function");

    act(() => {
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(0);

    act(() => {
      result.current();
      result.current();
      result.current();
      // ^ leading calls are ignored
    });

    expect(callback).toHaveBeenCalledTimes(0);

    act(() => {
      jest.advanceTimersByTime(1000);
      // ^ first trailing call occurs
    });

    act(() => {
      result.current();
      // ^ will occur only after time advance
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();

    jest.clearAllTimers();
  });

  it("should return a throttled function with trailing option disabled", () => {
    const callback = jest.fn();
    const { result } = renderHook(() =>
      useThrottle(callback, 1000, { trailing: false }),
    );

    expect(result.current).toBeDefined();
    expect(typeof result.current).toBe("function");

    act(() => {
      result.current(); // first call occurs
    });

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenLastCalledWith();

    act(() => {
      result.current();
      result.current();
      result.current();
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(1000);
      // ^ should not make trailing calls after time advances
    });

    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      result.current(); // second call occurs
    });

    expect(callback).toHaveBeenCalledTimes(2);

    jest.clearAllTimers();
  });
});
