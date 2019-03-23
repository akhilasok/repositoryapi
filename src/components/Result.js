import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import Item from './Item'

class Result extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return(
            <div className="container">
                <div className="row">
                {this.props.results.map((x, i) => {
                    return (
                        <div key={i} className="col-sm-3">
                            <Item value={x} />
                        </div>
                    )
                })}
                </div>
            </div>
        )
    }

}
export default Result