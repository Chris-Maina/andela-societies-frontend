import fetchMock from 'fetch-mock';
import { get, post, edit, checkStatus } from '../api';
import config from '../../../../config';

describe('Api util', () => {

  it('has checkStatus that throws an error ', () => {
    const response = { status: 400, statusText: 'error'};
    let error = {};
    error['statusText'] = Error(response.statusText);
    error['response'] = response;
    try {
      checkStatus(response);
    } catch (error) {
      expect(error).toEqual(error);
    }
  });

  it('makes a get request ', async () => {
    const url = `users/1/logged-activities`;
    const result = {
      data: [],
      pointsEarned: 20,
      activitiesLogged: 2,
    };
    fetchMock.get(`${config.API_BASE_URL}/${url}`, { ...result });
    expect(await get(url)).toEqual(result);
  });

  it('throws an error on get request ', async () => {
    const url = `users/1/logged-activities`;
    fetchMock.mock( url, () => { throw Error('There is an error') });
    try {
      await get(url);
    } catch (error) {
      expect(error.message).toBe('There is an error');
    }
  });

  it('makes a post request  ', async () => {
    const url = 'activity-types';
    const data = {
      description: 'Running new initiatives',
      name: 'New Events Organizer',
      value: 5,
      supports_multiple: 'False'
    };
    const result = {
      data: {
        ...data,
        id: 'eefad176-43cd-11e8-b3b9-9801a7ae0329',
        modifiedAt: null,
        createdAt: '2018-04-19T12:33:59.124758+00:00'
      },
      message: 'Activity type created successfully'
    };
    fetchMock.post(`${config.API_BASE_URL}/${url}`, { ...result });
    expect(await post(url, data)).toEqual(result);
  });

  it('makes a put request  ', async () => {
    const url = 'activity-types';
    const data = {
      description: "Running new initiatives",
      name: "New Events Organizer",
      value: 5,
      supports_multiple: "False"
    };
    const result = {
      data: {
        ...data,
        id: "eefad176-43cd-11e8-b3b9-9801a7ae0329",
        modifiedAt: null,
        createdAt: "2018-04-19T12:33:59.124758+00:00"
      },
      message: "Activity type edited successfully"
    };
    fetchMock.put(`${config.API_BASE_URL}/${url}`, { ...result });
    expect(await edit(url, data)).toEqual(result);
  });
});
