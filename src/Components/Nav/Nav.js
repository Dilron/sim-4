import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Nav extends React.Component {

    render(){
        return(
            <div>
                <h1>Nav</h1>
                <h3>User: {this.props.reduced.username} </h3>
                <img alt='profile pic' src={this.props.reduced.profileRef} />
                <span>
                    <Link to='/' >
                        <h3>Auth</h3>
                    </Link>
                    <Link to='/post' >
                        <h3>Post</h3>
                    </Link>
                    <Link to='/dashboard' >
                        <h3>Dashboard</h3>
                    </Link>
                </span>
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        reduced: reduxState.reduced
    }
}

export default connect(mapStateToProps)(Nav) 