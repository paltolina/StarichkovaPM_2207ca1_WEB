import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('/api/todos', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, text: 'Mocked Todo', completed: false }]));
  })
);

export { server, rest };
