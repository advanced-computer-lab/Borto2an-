import React from 'react'
import axios from 'axios';
import Model from './Model';
import { Component } from 'react';

class AllFlights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            models: []
        }
    }

    getAllModels = () =>{
        axios
            .get('http://localhost:8000/api/airplaneModel/showAllModels',{
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
            .then(res => {
                this.setState(
                    {
                        models: res.data
                    }
                );
            })
            .catch(err => {
                console.log(err);
            })
    };

    componentDidMount() {
        this.getAllModels();         
    };

    deleteModel = id => {
      axios
        .delete('http://localhost:8000/api/airplaneModel/'+id,{
          headers:{"authorization":"Bearer "+localStorage.getItem("token")}
        })
        .then(res => {this.getAllModels(); this.render();})
        .catch(err =>{
            alert("Error occurred in deletion");
        });
    };
  

  render() {
    let modellist;
    const models = this.state.models;
    if (!models) {
      modellist = "there is no flights !";
    } else {
      modellist = models.map((model) => (
        <Model
        _id={model._id}
        name={model.name}
        economyRows={model.economyRows}
        economyColumns={model.economyColumns}
        businessRows={model.businessRows}
        businessColumns={model.businessColumns}
        firstClassRows={model.firstClassRows}
        firstClassColumns={model.firstClassColumns}
        deleteModel={this.deleteModel}
        />
      ));
    }

    return (

      <section>
        <div class="tbl-header">
    <table>
          
              <th>Name</th>
              <th>Economy Rows</th>
              <th>Economy Columns</th>
              <th>Business Rows</th>
              <th>Business Columns</th>
              <th>First Class Rows</th>
              <th>First Class Columns</th>
              <th>Delete Flight</th>
            
        </table>
        <div class="tbl-content">
    <table cellpadding="0" cellspacing="0" border="0">
            {modellist}
            </table>
            </div>
       
        </div>
      </section>
    );
  }
}

export default AllFlights;