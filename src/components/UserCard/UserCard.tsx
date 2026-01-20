import { useEffect, useState } from 'react';
import { Avatar } from '../Avatar';
import './UserCard.css';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

export interface UserCardProps {
  userId: string;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

export function UserCard({ userId, onEdit, onDelete }: UserCardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/${userId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Usuário não encontrado');
          }
          throw new Error('Erro ao carregar usuário');
        }

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (isLoading) {
    return (
      <div className="user-card user-card--loading" data-testid="user-card-loading">
        <div className="spinner" role="status" aria-label="Carregando">
          <span className="spinner-text">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-card user-card--error" data-testid="user-card-error">
        <div role="alert" className="error-message">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="user-card user-card--empty" data-testid="user-card-empty">
        <div className="empty-state">
          <span className="empty-icon">👤</span>
          <p>Nenhum usuário encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-card" data-testid="user-card">
      <div className="user-card__header">
        <Avatar 
          src={user.avatar} 
          alt={user.name}
          size="large"
        />
      </div>
      
      <div className="user-card__content">
        <h2 className="user-card__name">{user.name}</h2>
        <p className="user-card__email">{user.email}</p>
        {user.role && (
          <span className="user-card__role">{user.role}</span>
        )}
      </div>

      {(onEdit || onDelete) && (
        <div className="user-card__actions">
          {onEdit && (
            <button 
              onClick={() => onEdit(user.id)}
              className="user-card__button user-card__button--edit"
              aria-label={`Editar ${user.name}`}
            >
              Editar
            </button>
          )}
          
          {onDelete && (
            <button 
              onClick={() => onDelete(user.id)}
              className="user-card__button user-card__button--delete"
              aria-label={`Deletar ${user.name}`}
            >
              Deletar
            </button>
          )}
        </div>
      )}
    </div>
  );
}
