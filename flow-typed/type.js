// @flow

export type Show = {
    title: string,
    year: string,
    description: string,
    poster: string,
    imdbID: string,
    trailer: string,
    rating?: string
}

declare var module: {
    hot: {
        accept(path: string, callback: () => void): void
    }
}

declare type ActionType = 'SET_SEARCH_TERM' | 'ADD_API_DATA'

declare type ActionT<A: ActionType, P> = {|
    type: A,
    payload: P
|}

export type Action = ActionT<'SET_SEARCH_TERM', string> | ActionT<'ADD_API_DATA', Show>