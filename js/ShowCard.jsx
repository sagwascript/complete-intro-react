// @flow

import * as React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Component = React.Component

const Wrapper = styled(Link)`
    width: 32%;
    border: 2px solid #333;
    border-radius: 4px;
    margin-bottom: 25px;
    padding-right: 10px;
    overflow: hidden;
    color: black;
    text-decoration: none;
`
const Image = styled.img`
    width: 46%;
    float: left;
    margin-right: 10px;
`

type Props = Show

class ShowCard extends Component<Props> {
    shouldComponentUpdate() {
        return false
    }

    render() {
        return (
            <Wrapper className="show-card" to={`/details/${this.props.imdbID}`}>
                <div>
                    <Image alt={`${this.props.title} Show Poster`} src={`/public/img/posters/${this.props.poster}`} />
                    <h4>{this.props.title}</h4>
                    <h3>({this.props.year})</h3>
                    <p>{this.props.description}</p>
                </div>
            </Wrapper>
        )
    }
}

export default ShowCard
