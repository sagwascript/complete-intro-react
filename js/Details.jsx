// @flow

import * as React from 'react'
import { connect } from 'react-redux'

import getAPIDetails from './asyncActions'
import Header from './Header'
import Spinner from './Spinner'

const Component = React.Component

type Props = {
    show: Show,
    rating: string,
    getAPIData: Function
}

class Details extends Component<Props> {
    componentDidMount() {
        if (!this.props.rating) {
            this.props.getAPIData()
        }
    }

    render() {
        const { title, description, year, poster, trailer } = this.props.show

        const ratingComponent = this.props.rating ? <h3>{this.props.rating}</h3> : <Spinner />

        return (
            <div className="details">
                <Header />
                <section>
                    <h1>{title}</h1>
                    <h2>({year})</h2>
                    {ratingComponent}
                    <img src={`/public/img/posters/${poster}`} alt={`Poster of ${title}`} />
                    <p>{description}</p>
                </section>
                <div>
                    <iframe
                        src={`https://www.youtube-nocookie.com/embed/${trailer}?rel=0&amp;controls=0&amp;showinfo=0`}
                        frameBorder="0"
                        title={`Trailer of ${title}`}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const apiData = state.apiData[ownProps.show.imdbID] ? state.apiData[ownProps.show.imdbID] : {}
    return {
        rating: apiData.rating
    }
}

const mapDispatchToProps = (dispatch: Function, ownProps) => ({
    getAPIData() {
        dispatch(getAPIDetails(ownProps.show.imdbID))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Details)
