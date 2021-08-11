import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import { styles } from './style';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            result: {},
            customerInfo: {}
        }
    }
    
    componentDidMount() {
        this.props.getProfile();
        this.props.getGeneticResult();
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.genResult.items && prevProps.genResult.items != this.props.genResult.items && this.props.genResult.items.length > 0){
            this.setState({
                result: this.props.genResult.items
            })
        }
    }

    render() {
        const { profile } = this.props;
        const result = this.props.genResult.items
        return (
            <div >
                 <p>
                    <Link to="/login" style={styles.Log}>Logout</Link>
                </p>
                <div style={styles.Firstsection}>
                    <h3 style={styles.Header}>Customer Personal details</h3>
                        {
                            profile.items &&
                            Object.entries(profile.items).map(([key, val]) => 
                                <div style={styles.Details}>
                                    <p style={styles.Label} key={key}>{(key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," ")}: </p>
                                    <p style={styles.Value}>{val}</p>
                                </div>
                            )
                        }
                </div>
                
                <div style={styles.Secondsection}>
                    <h3 style={styles.Header}>Genetic Results</h3>
                    <div>
                        {
                            result && result.length > 0 ?
                                Object.entries(result).map((ele, k) => 
                                        <div>
                                            {
                                                Object.entries(ele[1]).map(([key, val]) => 
                                                    typeof val === 'object' && val !== null 
                                                    ?
                                                        Object.entries(val).map(([k, v]) => 
                                                            <div style={styles.Details}>
                                                                <p style={styles.Label} key={k}>{(k.charAt(0).toUpperCase() + k.slice(1)).replace(/_/g," ")}: </p>
                                                                <p style={styles.Value}>{v}</p>
                                                            </div>
                                                        )
                                                    :
                                                        <div style={styles.Details}>
                                                            <p style={styles.Label} key={key}>{(key.charAt(0).toUpperCase() + key.slice(1)).replace(/_/g," ")}: </p>
                                                            <p style={styles.Value}>{val}</p>
                                                        </div>
                                                )
                                            }
                                        </div>
                                        
                                )
                            : "No results are available"
                        }
                    </div>
                </div>
                 
               
            </div>
        );
    }
}


function mapState(state) {
    const { profile, authentication, genResult } = state;
    const { user } = authentication;
    return { user, profile, genResult };
}

const actionCreators = {
    getProfile: userActions.getProfile,
    getGeneticResult: userActions.getGeneticResult,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };