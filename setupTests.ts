class IntersectionObserverMock {
  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit,
  ) {}
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
global.IntersectionObserver = IntersectionObserverMock as any;
