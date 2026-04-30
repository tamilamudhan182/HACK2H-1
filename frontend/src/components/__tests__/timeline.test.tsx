import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Timeline } from "@/components/timeline";
import type { Milestone } from "@/lib/types";

const milestones: Milestone[] = [
  {
    id: "registration",
    title: "Registration",
    icon: "??",
    shortDescription: "Register to vote.",
    longDescription: "Register through the voter services portal.",
    windowLabel: "Open now",
    stage: "registration",
    eligibility: ["Be eligible"],
    learnMore: ["Complete the form"],
    boothQuery: "Chennai polling booth",
    actions: []
  }
];

describe("Timeline", () => {
  it("renders milestones and allows selection", async () => {
    const user = userEvent.setup();
    const onSelect = jest.fn();

    render(
      <Timeline milestones={milestones} selectedId="registration" onSelect={onSelect} />
    );

    const card = screen.getByRole("button", { name: /registration/i });
    expect(card).toBeInTheDocument();

    await user.click(card);
    expect(onSelect).toHaveBeenCalledWith("registration");
  });
});

