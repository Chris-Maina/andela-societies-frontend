import React from 'react';
import { mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import VerifyActivities from '../../src/containers/VerifyActivities';
import storeFixture from '../../src/fixtures/store';

const store = createMockStore(storeFixture);
const history = { push: () => { } };

const mounted = mount.bind(
  null,
  <Provider store={store}>
    <MemoryRouter>
      <VerifyActivities
        history={history}
        fetchUserInfo={() => {}}
        changePageTitle={() => {}}
      />
    </MemoryRouter>
  </Provider>,
);

describe('<VerifyActivities />', () => {
  it('should render without crashing', () => {
    expect(mounted).not.toThrow();
  });
});
