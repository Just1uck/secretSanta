import { IsTokenRightMiddleware } from './is-token-right.middleware';

describe('IsTokenRightMiddleware', () => {
  it('should be defined', () => {
    expect(new IsTokenRightMiddleware()).toBeDefined();
  });
});
