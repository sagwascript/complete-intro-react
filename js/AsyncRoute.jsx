// @flow

import * as React from 'react'
import Spinner from './Spinner'

const { Component } = React

type Props = {
    props: mixed,
    loadingPromise: Promise<{ default: Class<React$Component<*, *>> }>
}

type State = {
    loaded: boolean
}

class AsyncRoute extends Component<Props, State> {
    state = {
        loaded: false
    }

    componentDidMount() {
        this.props.loadingPromise.then(module => {
            this.Markup = module.default
            this.setState({ loaded: true })
        })
    }

    // empty fn as default component
    Markup = () => {}

    render() {
        if (this.state.loaded) {
            const { Markup } = this
            return <Markup {...this.props.props} />
        }
        return <Spinner />
    }
}

export default AsyncRoute
