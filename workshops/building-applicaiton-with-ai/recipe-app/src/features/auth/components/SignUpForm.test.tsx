import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignUpForm } from './SignUpForm';

// Improved mock for supabase client
const mockUpdate = jest.fn();
const mockEq = jest.fn();
jest.mock('../../../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      signUp: jest.fn(),
    },
    from: () => ({
      update: (updateObj: any) => {
        mockUpdate(updateObj);
        return {
          eq: (idKey: string, idValue: string) => {
            mockEq(idKey, idValue);
            return { data: {}, error: null };
          },
        };
      },
    }),
  },
}));

const mockSignUp = require('../../../lib/supabaseClient').supabase.auth.signUp;

describe('SignUpForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields', () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
  });

  it('shows validation error if fields are empty', () => {
    render(<SignUpForm />);
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.getByText(/all fields are required/i)).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('shows validation error if password is too short', () => {
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('calls supabase signUp and updates public.users, then shows success message', async () => {
    mockSignUp.mockResolvedValueOnce({ data: { user: { id: 'user-123' } }, error: null });
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() =>
      expect(screen.getByText(/check your email to confirm your account/i)).toBeInTheDocument(),
    );
    expect(mockSignUp).toHaveBeenCalledWith({ email: 'test@example.com', password: '123456' });
    expect(mockUpdate).toHaveBeenCalledWith({ first_name: 'John', last_name: 'Doe' });
    expect(mockEq).toHaveBeenCalledWith('id', 'user-123');
  });

  it('shows error message if supabase returns error', async () => {
    mockSignUp.mockResolvedValueOnce({ data: {}, error: { message: 'Email already registered' } });
    render(<SignUpForm />);
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(await screen.findByText(/email already registered/i)).toBeInTheDocument();
  });
});
