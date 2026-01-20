import { describe, it, expect, vi, afterAll, beforeAll, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { User, UserCard } from '.';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

const mockUser: User[] = [{
    id: '1',
    name: 'Ramon Peres',
    email: 'ramon.peres@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ramon',
    role: 'Developer'
}, {
    id: '2',
    name: 'Lucas Nobre',
    email: 'lucas.nobre@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas',
    role: 'Frontend Developer'
}]

const server = setupServer(
    http.get('/api/users/:userId', ({ params }) => {
      const user = mockUser.find(u => u.id === params.userId);
      
      if (user) {
        return HttpResponse.json(user);
      }
      return new HttpResponse(null, { status: 404 });
    })
  );

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserCard Renderization', () => {
    it('should render the user card', async () => {
        render(<UserCard userId={mockUser[0].id} />);

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        expect(screen.getByText(mockUser[0].name)).toBeInTheDocument();
    })

    it('should render the user image', async () => {
        render(<UserCard userId={mockUser[0].id} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        const avatar = screen.getByRole('img', { name: mockUser[0].name });
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute('src', mockUser[0].avatar);
        expect(avatar).toHaveAttribute('alt', mockUser[0].name);
    })

    it('should render the user card with other id' , async () => {
        render(<UserCard userId={mockUser[1].id} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        expect(screen.getByText(mockUser[1].name)).toBeInTheDocument();
    })

    it('should render when the user is not found', async () => {
        render(<UserCard userId="999" />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        expect(screen.getByText('Usuário não encontrado')).toBeInTheDocument();
    })
})

describe('UserCard Interactions', () => {
    it('should show edit button when onEdit is provided', async () => {
        const onEditMock = vi.fn();
        render(<UserCard userId={mockUser[0].id} onEdit={onEditMock} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        expect(screen.getByRole('button', {name: /editar/i})).toBeInTheDocument();
    })

    it('should show delete button when onDelete is provided', async () => {
        const onDeleteMock = vi.fn();
        render(<UserCard userId={mockUser[0].id} onDelete={onDeleteMock} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        expect(screen.getByRole('button', {name: /deletar/i})).toBeInTheDocument();
    })

    it('should not show buttons when onEdit and onDelete are not provided', async () => {
        render(<UserCard userId={mockUser[0].id} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        expect(screen.queryByRole('button', {name: /editar/i})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /deletar/i})).not.toBeInTheDocument();
    })

    it('should call onEdit when edit button is clicked', async () => {
        const onEditMock = vi.fn();
        render(<UserCard userId={mockUser[0].id} onEdit={onEditMock} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        fireEvent.click(screen.getByRole('button', {name: /editar/i}));

        expect(onEditMock).toHaveBeenCalled();
        expect(onEditMock).toHaveBeenCalledWith(mockUser[0].id);
        expect(onEditMock).toHaveBeenCalledTimes(1);
    })

    it('should call onDelete when delete button is clicked', async () => {
        const onDeleteMock = vi.fn();
        render(<UserCard userId={mockUser[0].id} onDelete={onDeleteMock} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        fireEvent.click(screen.getByRole('button', {name: /deletar/i}));

        expect(onDeleteMock).toHaveBeenCalled();
        expect(onDeleteMock).toHaveBeenCalledWith(mockUser[0].id);
        expect(onDeleteMock).toHaveBeenCalledTimes(1);
    })

    it('should call onEdit multiple times when clicked multiple times', async () => {
        const onEditMock = vi.fn();
        render(<UserCard userId={mockUser[0].id} onEdit={onEditMock} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        fireEvent.click(screen.getByRole('button', {name: /editar/i}));
        fireEvent.click(screen.getByRole('button', {name: /editar/i}));

        expect(onEditMock).toHaveBeenCalledTimes(2);
    })

    it('should show both buttons when onEdit and onDelete are provided', async () => {
        const onEditMock = vi.fn();
        const onDeleteMock = vi.fn();
        render(<UserCard userId={mockUser[0].id} onEdit={onEditMock} onDelete={onDeleteMock} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        expect(screen.getByRole('button', {name: /editar/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /deletar/i})).toBeInTheDocument();
    })
})

describe('UserCard Integration With Avatar', () => {
    it('should render the avatar', async () => {
        render(<UserCard userId={mockUser[0].id} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        const avatar = screen.getByTestId('avatar');
        expect(avatar).toBeInTheDocument();
    })

    it('should render the avatar with the correct props', async () => {
        render(<UserCard userId={mockUser[0].id} />)

        await waitFor(() => {
            expect(screen.queryByTestId('user-card-loading')).not.toBeInTheDocument();
        })

        const avatar = screen.getByTestId('avatar');
        expect(avatar).toHaveAttribute('src', mockUser[0].avatar);
        expect(avatar).toHaveAttribute('alt', mockUser[0].name);
    })
})