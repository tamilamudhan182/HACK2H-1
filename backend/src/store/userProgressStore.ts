const checklist = [
  {
    id: "register",
    title: "Register to vote",
    description: "Confirm enrollment and keep your acknowledgment or elector search handy.",
    completed: true
  },
  {
    id: "find-booth",
    title: "Find your booth",
    description: "Save directions to the correct polling station before voting day.",
    completed: true
  },
  {
    id: "cast-vote",
    title: "Cast your vote",
    description: "Carry accepted ID, arrive with enough time, and complete the final step.",
    completed: false
  }
];

let synced = false;

function computePercentage() {
  const completed = checklist.filter((item) => item.completed).length;
  return Math.round((completed / checklist.length) * 100);
}

export function getProgress() {
  return {
    percentage: computePercentage(),
    synced,
    checklist
  };
}

export function toggleChecklist(id: string) {
  const target = checklist.find((item) => item.id === id);
  if (target) {
    target.completed = !target.completed;
  }

  return getProgress();
}

export function markSynced() {
  synced = true;
  return getProgress();
}
