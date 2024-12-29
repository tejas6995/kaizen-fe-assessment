import { waitFor } from "@testing-library/dom";
import { Provider } from "react-redux";
import { vi, describe, it, expect } from "vitest";
import store from "../redux/store";
import UserDashboard from "./UserDashboard";
import { act, render, screen } from "@testing-library/react";
import axios from "axios";


vi.mock('axios'); 

describe('UserDashboard Component', () => {
    it('should render UserDashboard and display UserList and UserDetails', async () => {
        await act(async () => {
            render(
              <Provider store={store}>
                <UserDashboard />
              </Provider>
            );
          });
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Users List')).toBeInTheDocument();
      expect(screen.getByText('Users Details')).toBeInTheDocument();
    });
  
    it('should dispatch actions to load users successfully from API', async () => {
      const mockUsers = {
        users: [
          { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
          { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com' },
        ],
      };
      vi.mocked(axios.get).mockResolvedValue({ data: mockUsers })
      await act(async () => {
        render(
          <Provider store={store}>
            <UserDashboard />
          </Provider>
        );
      });
  
      expect(store.getState().users.status).toBe('succeeded');
      await waitFor(() => expect(store.getState().users.status).toBe('succeeded'));
      expect(store.getState().users.userList).toEqual(mockUsers.users);
    });
  
    it('should handle error state if API fails', async () => {
      vi.mocked(axios.get).mockRejectedValueOnce(new Error('Failed to fetch users'))
  
      await act(async () => {
        render(
          <Provider store={store}>
            <UserDashboard />
          </Provider>
        );
      });
      expect(store.getState().users.status).toBe('failed');
    });
  
    it('should show loading state while fetching users', async () => {
      vi.mocked(axios.get).mockImplementationOnce(() =>
        new Promise((resolve) => setTimeout(() => resolve({ data: { users: [] } }), 1000)))
  
      await act(async () => {
        render(
          <Provider store={store}>
            <UserDashboard />
          </Provider>
        );
      });
  
      expect(screen.getByText('User Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Users List')).toBeInTheDocument();
    });
  });