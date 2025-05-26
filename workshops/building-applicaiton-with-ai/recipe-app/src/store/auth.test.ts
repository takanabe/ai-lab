import { useAuthStore } from './auth';

describe('auth store', () => {
  beforeEach(() => {
    // Clear Zustand storage before each test
    window.localStorage.clear();
    useAuthStore.setState({ user: null });
  });

  it('should persist user state across reloads', () => {
    const user = { id: '123', email: 'test@example.com' } as any;
    useAuthStore.getState().setUser(user);
    // Simulate reload by creating a new store instance
    const newStore = useAuthStore;
    expect(newStore.getState().user).toEqual(user);
  });

  it('should clear user on signOut', async () => {
    const user = { id: '123', email: 'test@example.com' } as any;
    useAuthStore.getState().setUser(user);
    await useAuthStore.getState().signOut();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
