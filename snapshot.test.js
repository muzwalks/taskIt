import React from "react";
import renderer from "react-test-renderer";
import App from "./src/app";
import { exportAllDeclaration } from "@babel/types";

describe("App component", () => {
  it("matches the snapshot", () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
