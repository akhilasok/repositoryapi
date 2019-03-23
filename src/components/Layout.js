import React from 'react';
import { InputGroup, InputGroupAddon, Input, Pagination, Spinner, PaginationItem, PaginationLink } from 'reactstrap';
import Result from './Result';
import axios from 'axios';
const api = 'https://api.github.com/search/repositories?'

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: {
                q: 'test',
                page: 1,
                per_page: 8
            },
            total_count: 0,
            results: [],
            loading: true
        }
        this.handleChange = this.handleChange.bind(this)
        this.loadData  = this.loadData.bind(this)
        this.setData = this.setData.bind(this)
        this.loadData()
    }
    handleChange (e)  {
        this.setState({item: e.target.value});
    }
    loadData () { 
        var item = this.state.search  
        var str = "";
        for (var key in item) {
            if (str != "") str += "&";
            str += key + "=" + encodeURIComponent(item[key]);
        }
        axios.get(api + str).then(response => {
            this.setState({results: response.data.items, 
                total_count: response.data.total_count,
                loading: false
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    setData (c, name) {
        let st = Object.assign({}, this.state.search);  
        st[name] = c;                       
        this.setState({search: st});
        if(!this.state.loading)
            this.loadData()
    }
    render() {
        let active = this.state.search.page;
        let total = this.state.total_count > 0 ? this.state.total_count / this.state.search.per_page : 0
        let items = [];
        for (let number = 1; number <= total; number++) {
            items.push(
                <PaginationItem key={number} active={number === active}>
                    <PaginationLink onClick={(e) => {this.setData(number, 'page')}}>
                    {number}
                    </PaginationLink>
                </PaginationItem>,
            );
        }

        return(
            <div className="container mt-5">
                <div className="row justify-content-md-center">
                    <div className="col-sm-5">
                        <InputGroup>
                            <Input placeholder="search"  onChange={(e) => {this.handleChange(e)}} />
                            <InputGroupAddon addonType="append" className="c-pointer" onClick={(e) => {this.loadData(e)}}>Search</InputGroupAddon>
                        </InputGroup>
                    </div>
                </div>
                <div className="row mt-4">
                    {this.loading ? <Spinner type="grow" color="primary" /> : null }
                    <Result results={this.state.results}/>
                    <div className="col-sm-12 mt-5">
                        <Pagination aria-label="Page navigation example">
                            {items}
                        </Pagination>
                    </div>
                </div>
            </div>
        )
    }

}
export default Layout