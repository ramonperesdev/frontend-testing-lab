import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { User, UserCard } from '.';

const mockUser: User = {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    role: 'Developer'
}

describe('UserCard Renderization', () => {
    it('should render the user card', () => {
        render(<UserCard user={mockUser} />);

        expect(screen.getByText(mockUser.name)).toBeInTheDocument();
        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(screen.getByText(mockUser.role!)).toBeInTheDocument();
    })

    it('should render the user image', () => {
        render(<UserCard user={mockUser} />)

        expect(screen.getByRole('img', { name: mockUser.name })).toHaveAttribute('src', mockUser.avatar);
        expect(screen.getByRole('img', { name: mockUser.name })).toHaveAttribute('alt', mockUser.name);
    })

    it('should render loading state', () => {
        render(<UserCard user={mockUser} isLoading={true} />)

        expect(screen.getByTestId('user-card-loading')).toBeInTheDocument();
        expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
    })

    it('should render error state', () => {
        render(<UserCard user={mockUser} error="Error" />)

        expect(screen.getByTestId('user-card-error')).toBeInTheDocument();
        expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
    })

    it('should render empty state', () => {
        render(<UserCard user={null} />)

        expect(screen.getByTestId('user-card-empty')).toBeInTheDocument();
        expect(screen.queryByText(mockUser.name)).not.toBeInTheDocument();
    })
})

describe('UserCard Interactions', () => {
    it('should show edit button when onEdit is provided', () => {
        const onEditMock = vi.fn();
        render(<UserCard user={mockUser} onEdit={onEditMock} />)

        expect(screen.getByRole('button', {name: /editar/i})).toBeInTheDocument();
    })

    it('should show delete button when onDelete is provided', () => {
        const onDeleteMock = vi.fn();
        render(<UserCard user={mockUser} onDelete={onDeleteMock} />)

        expect(screen.getByRole('button', {name: /deletar/i})).toBeInTheDocument();
    })

    it('should not show buttons when onEdit and onDelete are not provided', () => {
        render(<UserCard user={mockUser} />)

        expect(screen.queryByRole('button', {name: /editar/i})).not.toBeInTheDocument();
        expect(screen.queryByRole('button', {name: /deletar/i})).not.toBeInTheDocument();
    })

    it('should call onEdit when edit button is clicked', () => {
        const onEditMock = vi.fn();
        render(<UserCard user={mockUser} onEdit={onEditMock} />)

        fireEvent.click(screen.getByRole('button', {name: /editar/i}));

        expect(onEditMock).toHaveBeenCalled();
        expect(onEditMock).toHaveBeenCalledWith(mockUser.id);
        expect(onEditMock).toHaveBeenCalledTimes(1);
    })

    it('should call onDelete when delete button is clicked', () => {
        const onDeleteMock = vi.fn();
        render(<UserCard user={mockUser} onDelete={onDeleteMock} />)

        fireEvent.click(screen.getByRole('button', {name: /deletar/i}));

        expect(onDeleteMock).toHaveBeenCalled();
        expect(onDeleteMock).toHaveBeenCalledWith(mockUser.id);
        expect(onDeleteMock).toHaveBeenCalledTimes(1);
    })

    it('should call onEdit multiple times when clicked multiple times', () => {
        const onEditMock = vi.fn();
        render(<UserCard user={mockUser} onEdit={onEditMock} />)

        fireEvent.click(screen.getByRole('button', {name: /editar/i}));
        fireEvent.click(screen.getByRole('button', {name: /editar/i}));

        expect(onEditMock).toHaveBeenCalledTimes(2);
    })

    it('should show both buttons when onEdit and onDelete are provided', () => {
        const onEditMock = vi.fn();
        const onDeleteMock = vi.fn();
        render(<UserCard user={mockUser} onEdit={onEditMock} onDelete={onDeleteMock} />)

        expect(screen.getByRole('button', {name: /editar/i})).toBeInTheDocument();
        expect(screen.getByRole('button', {name: /deletar/i})).toBeInTheDocument();
    })
})