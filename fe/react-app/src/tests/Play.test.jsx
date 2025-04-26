import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router";
import { getByRole, render, screen, waitFor } from "@testing-library/react";
import { DisplayImages } from "../routes/DisplayImages";
import { Start } from "../routes/StartGame";
import { StopWatch } from "../routes/StopWatch";
import {GameOver} from "../routes/GameOver"
import {LeaderBoard} from "../routes/LeaderBoard";

describe("DisplayImages", async () => {
  it("should display images when isCliked is true, positionX, positionY, width and height is provided", async () => {
    render(<DisplayImages isClicked={true} positionX={123} positionY={544} width={1000} height={1000}  />);
    const modal = screen.getByRole("modal");
    expect(modal).toBeInTheDocument();
  });

  it("should render nothing when isCliked is false, positionX, positionY, width and height  is not provided", () => {
    const modal = screen.queryByRole("modal");
    render(<DisplayImages isClicked={false} />);

    expect(modal).not.toBeInTheDocument();
  });
});

describe("Start", async () => {
  it("should display div modal to enter Name and select image to play if gameStarted is false", async () => {
    render(<Start gameStarted={false}  />);

    expect(screen.getByRole("intro-modal")).toBeInTheDocument();
  });

  it("should remove modal and button with text Start if start prop is true", async () => {
    const introModal = screen.queryByRole("intro-modal");

    render(<Start start={true} />);

    expect(introModal).not.toBeInTheDocument();
  });
});

describe("StopWatch", async () => {
  it("should display StopWatch that ticks", async () => {
    render(<StopWatch isActive={true} />);

    expect(screen.getByRole("heading")).toHaveTextContent(/0/i);
  });
});

describe("GameOver", async () => {
  it("should display div with congratulations to user that finished game and link to leaderBoard if status is Game Over", async () => {
   
    render( <BrowserRouter><GameOver status={"Game Over"} /> </BrowserRouter>);
   
    const img = screen.getByAltText(/Game-Over/i)
   console.log(img)
    expect(img).toBeInTheDocument();
  });
});

describe("LeaderBoard", async () => {
  it("should display page with leaderboard", async () => {
   
    render(<BrowserRouter><LeaderBoard/></BrowserRouter> );
   
    expect(screen.getByRole("heading")).toHaveTextContent(/LeaderBoard/i);
    screen.debug()
  });
});