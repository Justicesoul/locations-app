import { render, screen } from '@testing-library/react';
import App from './App';

describe('<App />', () => {
  it('should render initial state', () => {
    render(<App />);

    expect(screen.queryByText('Locations App')).toBeInTheDocument();
    expect(screen.queryByText('Location Details')).toBeInTheDocument();
  });

  it('should loading image be on initial state', () => {
    const { getByTestId } = render(<App />);
    const loading = getByTestId('loading');
    expect(loading).toBeTruthy();
  });

  it('should not be at the document', () => {
    render(<App />);

    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('Location Name:')).not.toBeInTheDocument();
  });
});
