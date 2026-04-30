import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FAQClient } from '../FAQClient';
import type { FaqItem, ResourceLink } from '@/lib/types';

const mockFaqs: FaqItem[] = [
  { id: "faq-1", question: "Am I eligible to vote?", shortAnswer: "Yes if you are 18+.", detailedAnswer: "You are eligible to vote if you are a citizen, at least 18 years of age." },
  { id: "faq-2", question: "How do I register to vote?", shortAnswer: "Submit Form 6.", detailedAnswer: "You can register online through the official Election Commission portal." },
];

const mockResources: ResourceLink[] = [
  { id: "eci", title: "National Voter Service Portal", description: "Official portal", url: "#", category: "Official Portal" },
];

describe('FAQClient Component', () => {
  it('renders the FAQ section and links', () => {
    render(<FAQClient faqs={mockFaqs} resources={mockResources} />);
    const heading = screen.getByText(/Frequently Asked Questions/i);
    expect(heading).toBeInTheDocument();
    
    const officialLink = screen.getByText(/National Voter Service Portal/i);
    expect(officialLink).toBeInTheDocument();
  });

  it('toggles FAQ answers on click', () => {
    render(<FAQClient faqs={mockFaqs} resources={mockResources} />);
    const firstQuestion = screen.getByText(/Am I eligible to vote\?/i);
    
    // First FAQ opens by default (openIndex = 0)
    expect(firstQuestion.closest('button')).toHaveAttribute('aria-expanded', 'true');
    
    // Click to close
    fireEvent.click(firstQuestion);
    expect(firstQuestion.closest('button')).toHaveAttribute('aria-expanded', 'false');
  });
});
