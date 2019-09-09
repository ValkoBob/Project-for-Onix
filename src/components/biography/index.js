import React, {Component} from 'react'
import Preload from './scenes/preload'
import Table from './scenes/table'
import Form from './scenes/form'

class Bio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortedByFunc: false,
      sortedByBubble: false,
      events: [
        {
          date: "1994",
          event: "BirthDay"
        },
        {
          date: "2000",
          event: "Start to study at school"

        },
        {
          date: "2008",
          event: "Start to study in another school"

        },
        {
          date: "2010",
          event: "End the school"

        },
        {
          date: "2010",
          event: "Start to study in SPI"

        },
        {
          date: "2015",
          event: "Graduated from Institute"
        },
        {
          date: "2015",
          event: "Start to study in KDPU"
        },
        {
          date: "2017",
          event: "Graduated from University"
        },
        {
          date: "2018",
          event: "Start to study Programming"

        }
      ],
      selected: [],
      text: '',
      year: '',
      lastText: '',
      lastYear: '',
      showImage: true,
      error: false,
      isLoading: false,
    };
  }

  updateState = (data) => {
    this.setState({
      state: data
    })
  };

  render() {
    return (
        <section className="container">
          <div className="biography">
            <Preload
                data={this.state}
                onUpdateState={this.updateState}
            />
            <Table
                data={this.state}
                onUpdateState={this.updateState}
            />
            <Form
                data={this.state}
                onUpdateState={this.updateState}
            />
          </div>
        </section>
    )
  }
}

export default Bio