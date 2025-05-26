import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignUpForm } from './SignUpForm';

// Mock supabase client
jest.mock('../../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
  },
}));

const mockSignUp = require('../../../lib/supabaseClient').supabase.auth.signUp;

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows validation error if fields are empty', async () => {
    render(<SignUpForm />);
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    // Debug: log the DOM to see what is rendered
    // eslint-disable-next-line no-console
    // @ts-ignore
    // eslint-disable-next-line testing-library/no-debugging-utils
    screen.debug();
    expect(
      screen.getByText((content) => content.includes('Email and password are required'))
    ).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('shows validation error if password is too short', async () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('calls supabase signUp and shows success message', async () => {
    mockSignUp.mockResolvedValueOnce({ error: null });
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() =>
      expect(screen.getByText(/check your email to confirm your account/i)).toBeInTheDocument(),
    );
    expect(mockSignUp).toHaveBeenCalledWith({ email: 'test@example.com', password: '123456' });
  });

  it('shows error message if supabase returns error', async () => {
    mockSignUp.mockResolvedValueOnce({ error: { message: 'Email already registered' } });
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(/email already registered/i)).toBeInTheDocument();
  });
});
