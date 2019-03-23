import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Badge, CardFooter } from 'reactstrap';

class Item extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        var x = this.props.value
        return (
            <div className="p-2">
                <Card>
                    <CardImg top width="100%" src={x.owner.avatar_url} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{x.name}</CardTitle>
                        <CardSubtitle>Card subtitle</CardSubtitle>
                        <CardText>{x.description}</CardText>
                        <Badge color="primary" className="m-2" pill>{x.stargazers_count}</Badge>
                        <Badge color="primary" className="m-2" pill>{x.forks_count}</Badge>
                        <Badge color="primary" className="m-2" pill>{x.open_issues_count}</Badge>
                    </CardBody>
                    <CardFooter className="c-pointer">
                        View Profile
                    </CardFooter>
                </Card>
            </div>
        );
    }
};

export default Item;