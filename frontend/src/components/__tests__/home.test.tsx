import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { HomeClient } from '../HomeClient';

describe('HomeClient Component', () => {
  it('renders the main heading', () => {
    render(<HomeClient />);
    const heading = screen.getByText(/Navigate the Election Process with Confidence/i);
    expect(heading).toBeInTheDocument();
  });

  it('renders call to action links', () => {
    render(<HomeClient />);
    const timelineLink = screen.getByText(/Explore Timeline/i);
    const checklistLink = screen.getByText(/My Checklist/i);
    const faqLink = screen.getByText(/FAQs/i);

    expect(timelineLink).toBeInTheDocument();
    expect(checklistLink).toBeInTheDocument();
    expect(faqLink).toBeInTheDocument();
  });
});
