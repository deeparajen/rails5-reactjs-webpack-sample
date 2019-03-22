import React from 'react';
import BodyPostApp from './BodyPostApp';


export default class MainComponent extends React.Component {
	
 render() {
    return (
      <div className="container">
       <div className="jumbotron">
          <h4>ReactJS Rails WebPack Application</h4>
       </div>
        
        <div className="row">
          <div className="col-md-12">
            <BodyPostApp />
          </div>
        </div>
        
        
       
      </div>
    );
  }
}