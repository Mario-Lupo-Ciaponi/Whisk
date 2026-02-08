import { it, expect } from "vitest";
import formatCoordinates from "./formatCoordinates.js";

it("formats 12.34567 to '12.346'", () => {
  expect(formatCoordinates(12.34567)).toBe("12.346");
});

it("formats 12.3 to '12.300'", () => {
  expect(formatCoordinates(12.3)).toBe("12.300");
});

it("formats 0 to '0.000'", () => {
  expect(formatCoordinates(0)).toBe("0.000");
});

it("formats -7.8912 to '-7.891'", () => {
  expect(formatCoordinates(-7.8912)).toBe("-7.891");
});

it("formats null to '0.000'", () => {
  expect(formatCoordinates(null)).toBe("0.000");
});

it("formats undefined to 'NaN'", () => {
  expect(formatCoordinates(undefined)).toBe("NaN");
});

it("formats 'ABC' to 'NaN'", () => {
  expect(formatCoordinates("ABC")).toBe("NaN");
});

it("formats 0.0004 to '0.000'", () => {
  expect(formatCoordinates(0.0004)).toBe("0.000");
});
