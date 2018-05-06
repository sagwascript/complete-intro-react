// @flow

import moxios from 'moxios'
import { setSearchTerm, addAPIData, getAPIDetails } from '../actionCreators'

const apiData = {
    title: 'Game of Thrones',
    year: '2011–',
    description: 'Nine noble families fight for control over the mythical lands of Westeros, while a forgotten race returns after being dormant for thousands of years.',
    poster: 'got.jpg',
    imdbID: 'tt0944947',
    trailer: 'giYeaKsXnsI',
    rating: '4.3'
}

test('setSearchTerm', () => {
    expect(setSearchTerm('New York')).toMatchSnapshot()
})

test('addAPIData', () => {
    expect(addAPIData(apiData)).toMatchSnapshot()
})

test('getAPIDetails', (done: Function) => {
    const dispatchMock = jest.fn()
    moxios.withMock(() => {
        getAPIDetails(apiData.imdbID)(dispatchMock)
        moxios.wait(() => {
            const request = moxios.requests.mostRecent()
            request
                .respondWith({
                    status: 200,
                    response: apiData
                })
                .then(() => {
                    expect(request.url).toEqual(`http://localhost:3000/${apiData.imdbID}`)
                    expect(dispatchMock).toBeCalledWith(addAPIData(apiData))
                    done()
                })
        })
    })
})
