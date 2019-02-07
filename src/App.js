import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CampaignList from './components/CampaignList';
import HistoryPanel from './components/HistoryPanel';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      campaignList: [{
        name: "one",
        createdOn: "12:00pm",
        status: "paused",
        history: [{
          type: "created",
          changedBy: "Chirag"
        },{
          type: "comment",
          changedBy: "Chirag",
          comment: "Good Luck"
        },{
          type: "rename",
          changedBy: "Chirag",
          oldValue: "Campaign-1",
          newValue: "one"
        },{
          type: "comment",
          changedBy: "Chirag",
          comment: "Ho payega..."
        },{
          type: "paused",
          changedBy: "Chirag"
        }]
      }]
    }

    this.onCampaignSelect = this.onCampaignSelect.bind(this);
    this.addNewCampaign = this.addNewCampaign.bind(this);
    this.deleteCampaign = this.deleteCampaign.bind(this);
    this.toggleCampaign = this.toggleCampaign.bind(this);
    this.commentCampaign = this.commentCampaign.bind(this);
    this.renameCampaign = this.renameCampaign.bind(this);
  }

  onCampaignSelect(index){
    this.setState({
      selected: index
    });
  }

  deleteCampaign(index){
    let campaign = this.state.campaignList;
    campaign.splice(index,1);
    this.setState({
      campaignList: campaign,
      selected: null
    });
  }

  toggleCampaign(index){
    let campaign = this.state.campaignList;
    if (campaign[index].status === 'played') {
      campaign[index].status = 'paused';
    } else{
      campaign[index].status = 'played';
    }
    campaign[index].history.push({type: campaign[index].status, changedBy: 'user'})
    this.setState({
      campaignList: campaign
    });
  }

  commentCampaign(index, comment){
    let campaign = this.state.campaignList;
    campaign[index].history.push({type: 'comment', comment: comment, changedBy: 'user'});
    this.setState({
      campaignList: campaign
    });
  }

  renameCampaign(index, oldValue, newValue){
    let campaign = this.state.campaignList;
    campaign[index].name = newValue;
    campaign[index].history.push({type: 'rename', changedBy: 'user', oldValue: oldValue, newValue: newValue});
    this.setState({
      campaignList: campaign
    });
  }

  addNewCampaign() {
    let campaign = this.state.campaignList;
    let campaignName = prompt("Please campaign name", '');
    if (campaignName != null) {
      campaign.push({name: campaignName, createdOn: '12:00pm', status: 'played', history: [{type: 'created',changedBy: 'user'}]})
      this.setState({campaignList: campaign});
    }
  }

  render() {
    return (
      <div className="app-conatiner">
        <div className="campaign-header">
          <span className="glyphicon glyphicon-envelope"></span>
          <span className="campaign-header-heading">All Campaigns</span>
        </div>
        <div className="campaign-wrapper">          
          <div className="campaign-list-header">
            <span className="glyphicon glyphicon-align-left"></span>
            <span className="campaign-list-text">Campaign List</span>
            <button onClick={this.addNewCampaign}>+ Create New</button>
          </div>
          <div className="campaign-list-container">
            <CampaignList 
              campaignList={this.state.campaignList} 
              onCampaignSelect={this.onCampaignSelect}
              selectedCampaignIndex={this.state.selected}
              deleteCampaign={this.deleteCampaign}
              toggleCampaign={this.toggleCampaign}
              commentCampaign={this.commentCampaign}
              renameCampaign={this.renameCampaign}
            />
            {this.state.selected!=null && 
              <HistoryPanel selectedCampaign={this.state.campaignList[this.state.selected]} />
            }            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
