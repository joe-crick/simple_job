import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

global.IntersectionObserver = jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }))

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });