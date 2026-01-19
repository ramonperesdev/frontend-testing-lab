import './UserCard.css';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

export interface UserCardProps {
  user: User | null;
  isLoading?: boolean;
  error?: string;
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

export function UserCard({ 
  user, 
  isLoading = false, 
  error, 
  onEdit,
  onDelete 
}: UserCardProps) {
  
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
        <img 
          src={user.avatar} 
          alt={user.name}
          className="user-card__avatar"
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
