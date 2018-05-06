import React from 'react'
import { shallow, render } from 'enzyme'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { Unwrapped as UnwrappedSearch } from '../Search'
import ShowCard from '../ShowCard'
import preload from '../../data.json'
import store from '../store'
import { setSearchTerm } from '../actionCreators'

test('Search renders correctly', () => {
    const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />)

    expect(component).toMatchSnapshot()
})

test('Search should renders correct amount of shows', () => {
    const component = shallow(<UnwrappedSearch shows={preload.shows} searchTerm="" />)

    expect(component.find(ShowCard).length).toEqual(preload.shows.length)
})

test('Search should renders correct amount of shows based on search term', () => {
    const searchWord = 'black'
    store.dispatch(setSearchTerm(searchWord))
    const component = render(
        <Provider store={store}>
            <MemoryRouter>
                <UnwrappedSearch shows={preload.shows} searchTerm={searchWord} />
            </MemoryRouter>
        </Provider>
    )

    const showCount = preload.shows.filter(
        show => `${show.title} ${show.description}`.toUpperCase().indexOf(searchWord.toUpperCase()) >= 0
    ).length

    expect(component.find('.show-card').length).toEqual(showCount)
})
