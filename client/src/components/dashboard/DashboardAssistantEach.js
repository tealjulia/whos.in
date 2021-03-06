import React, { Component } from 'react'
import axios from 'axios';

class DashboardAssistantEach extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      phone: '',
      errors: {}
    }

    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  componentDidMount(){
    this.setState({
      name: this.props.assistant.name,
      phone: this.props.assistant.phone
    })
  }

  onDeleteClick(e){
    e.preventDefault();
    const assistantData = this.state.name;


    if (window.confirm("Are you sure? This can not be undone!")) {
      axios 
        .delete('/api/assistants/delete', {data: {name: assistantData} })
        .then(response => {window.location.reload();})
        .catch(err => console.log(err)); 
    }


  }

  onSubmitChange(e)  {
    e.preventDefault();
    const assistantData = {
      name: this.state.name,
      phone: this.state.phone
    };

    axios 
      .post('/api/assistants/update', assistantData)
      .then(response => {window.location.reload();})
      .catch(err => console.log(err));

  }
  
  
  render() {
    const assistant = this.props.assistant;

    const defaultRow = (
      <div className="row shadow bg-white border text-dark p-2 pl-3 col-10 mx-auto">    
        <span className="col-12 col-md-4">{assistant.name}</span> 
        <span className="col-12 col-md-4">{assistant.phone}</span> 
        <span className="col-12 col-md-4"><i className="far fa-trash-alt" onClick={this.onDeleteClick}></i></span>
      </div>)
    

    


    return (
      <div>
          {defaultRow}
      </div>
    )
  }
}

export default DashboardAssistantEach;