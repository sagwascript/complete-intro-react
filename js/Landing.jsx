// @flow

import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import type { RouterHistory } from 'react-router-dom'

import { setSearchTerm } from './actionCreators'

const Component = React.Component

type Props = {
    searchTerm: string,
    handleSearchTermChange: Function,
    handleClickBrowseAll: Function,
    history: RouterHistory
}

class Landing extends Component<Props> {
    goToSearch = (event: SyntheticEvent<>) => {
        event.preventDefault()
        this.props.history.push('/search')
    }

    render() {
        return (
            <div className="landing">
                <h1>Bath-tube</h1>
                <form onSubmit={this.goToSearch}>
                    <input
                        onChange={this.props.handleSearchTermChange}
                        value={this.props.searchTerm}
                        type="text"
                        placeholder="Search"
                    />
                </form>
                <Link to="/search" onClick={this.props.handleClickBrowseAll}>or Browse All</Link>
            </div>
        )
    }
}

const mapStateToProps = state => ({ searchTerm: state.searchTerm })
const mapDispatchToProps = (dispatch: Function) => ({
    handleSearchTermChange(event) {
        dispatch(setSearchTerm(event.target.value))
    },
    handleClickBrowseAll() {
        dispatch(setSearchTerm(''))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(Landing)
