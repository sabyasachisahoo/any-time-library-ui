import React,{Component} from 'react';
import {debounce} from 'throttle-debounce';
import axios from '../../../axios';


class SearchBook extends Component{
    state = {
        query:'',
        results:[]
    }

    componentDidMount(){
        this.onSearch = debounce(500,this.onSearch);
    }
    
    componentDidUpdate(){
        // <Redirect to={{
        //     pathname:'/results',
        //     state:{results:this.state.results}
        // }} />
    }

    setAuthorization() {
        return  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    }

    onSearch = () => {
        this.setAuthorization();
        
        axios.get(`/book/search?title=${this.state.query}`)
        .then(res => {
            this.setState({ results: res.data });
            this.props.callbackFromParent(this.state.results);
        })
        .catch((error) => {
            console.log(error)
        });
                
    }

    searchHandler = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 3) {
        if (this.state.query.length % 2 === 0) {
          this.onSearch()
        }
      }else if (!this.state.query) {
      }
    })
    }

    render(){
        return(
            <form className="searchbar">
                <input type="text" placeholder="Search by Title"
                        ref={input => this.search = input}
                        onChange={this.searchHandler} />
            </form>
        )
    }
}

export default SearchBook