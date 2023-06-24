import { readdirSync } from "fs";

import { FOLDERS_PATH } from "./__mocks__/constans";
import * as folders from "./index";

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  readdirSync: jest.fn(),
}));

const mockedReaddirSync = jest.mocked(readdirSync);

beforeEach(() => {
  mockedReaddirSync.mockImplementation(jest.requireActual("fs").readdirSync);
});

describe("init", () => {
  it("should hydrate folders and return the folderFlatMap", () => {
    expect(folders.init(FOLDERS_PATH)).toEqual({
      "/": {
        name: "/",
        parent: "/",
        directories: ["1_L1", "2_L1"],
        files: [],
      },
      "/1_L1": {
        name: "1_L1",
        parent: "/",
        directories: ["1_L2"],
        files: [],
      },
      "/1_L1/1_L2": {
        name: "1_L2",
        parent: "/1_L1",
        directories: ["1_L3"],
        files: [],
      },
      "/1_L1/1_L2/1_L3": {
        name: "1_L3",
        parent: "/1_L1/1_L2",
        directories: [],
        files: ["index.html"],
      },
      "/2_L1": {
        name: "2_L1",
        parent: "/",
        directories: ["2_L2"],
        files: [],
      },
      "/2_L1/2_L2": {
        name: "2_L2",
        parent: "/2_L1",
        directories: [],
        files: ["text.txt"],
      },
    });
  });

  it("should throw error upon exceeding max depth", () => {
    mockedReaddirSync.mockClear();
    // @ts-expect-error `name` and `isDirectory` values satisfy function implementation
    mockedReaddirSync.mockImplementation(() => [
      {
        name: "dir",
        isDirectory: () => true,
      },
    ]);

    expect(() => folders.init(FOLDERS_PATH)).toThrow(
      "Max depth exceeded upon folder hydration",
    );
    expect(mockedReaddirSync).toBeCalledTimes(10);
  });
});

describe("read", () => {
  it("should read folder by path", () => {
    folders.init(FOLDERS_PATH);

    expect(folders.read("/")).toEqual({
      name: "/",
      parent: "/",
      directories: ["1_L1", "2_L1"],
      files: [],
    });

    expect(folders.read("/1_L1/1_L2/1_L3")).toEqual({
      name: "1_L3",
      parent: "/1_L1/1_L2",
      directories: [],
      files: ["index.html"],
    });
  });

  it("should return null if path is unknown", () => {
    expect(folders.read("non existing")).toBeNull();
  });
});
