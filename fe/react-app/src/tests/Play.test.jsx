import { describe, it, expect } from "vitest";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import {DisplayImages} from "../routes/DisplayImages";
import {Start} from "../routes/StartGame";
import {StopWatch} from "../routes/StopWatch";


describe("DisplayImages", async () => {
  it("should display images when isCliked is true, positionX and positionY is provided", async () => {
    render(<DisplayImages isClicked={true} positionX={123} positionY={544} />);
    const Img = screen.getByAltText(/image2/i);
    expect(Img).toBeInTheDocument();
  });

  it("should render nothing when isCliked is false, positionX and positionY is not provided", () => {
    const Img = screen.queryByAltText(/image2/i);
    render(<DisplayImages isClicked={false} />);

    expect(Img).not.toBeInTheDocument();
  });
});

describe("Start", async () => {
  it("should display button with text Start if start prop is false", async () => {
    render(<Start start={false} />);

    expect(screen.getByRole("button")).toHaveTextContent(/Start/i);
  });

  it("should remove modal and button with text Start if start prop is true", async () => {
    const button = screen.queryByText(/Start/i);

    render(<Start start={true} />);

    expect(button).not.toBeInTheDocument();
  });
});

describe("StopWatch", async () => {
  it("should display StopWatch that ticks", async () => {
    render(<StopWatch isActive={true} />);

    expect(screen.getByRole("heading")).toHaveTextContent(/0/i);
    screen.debug();
  });
});
