import { http, HttpResponse } from 'msw';

// Mock data
const users = [
  {
    id: '1',
    name: 'Ramon Peres',
    email: 'ramon.peres@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Joao',
    role: 'Developer'
  },
  {
    id: '2',
    name: 'Lucas Nobre',
    email: 'lucas.nobre@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Antonio',
    role: 'Frontend Developer'
  }
];

export const handlers = [
  http.get('/api/users/:userId', ({ params }) => {
    const { userId } = params;
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return new HttpResponse(null, { status: 404 });
    }
    
    return HttpResponse.json(user, {
      headers: { 'Content-Type': 'application/json' }
    });
  }),
];
