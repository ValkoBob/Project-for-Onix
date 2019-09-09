import React, {Component} from 'react'

class Preload extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Function show error
   */
  handleError = () => {
    alert('error');
    let {error} = this.props.data;
    this.props.data.error = !error;
    this.props.onUpdateState(this.props.data);
  };

  /**
   * Function make true or false for show image
   */
  toggleImage = () => {
    let {showImage} = this.props.data;
    this.props.data.showImage = !showImage;
    this.props.onUpdateState(this.props.data);
  };

  /**
   * Function loads image in interval of 2 seconds
   */
  handleDocumentLoad = () => {
    this.toggleImage();
    setTimeout(this.toggleImage, 2000);
  };

  render() {
    return (
        <div className='title'>
          <h3>Biography</h3>
          <img alt="load bar" src={require('./table/load.gif')}
               onLoad={this.handleDocumentLoad}
               className={this.props.data.showImage ? 'loadingImage' : 'loadingImage hidden'}/>
          <img alt="food" src={require('./table/error.gif')}
               onError={this.handleError}
               className={this.props.data.error ? 'loadingImage' : 'loadingImage hidden'}/>
        </div>
    );
  }
}

export default Preload