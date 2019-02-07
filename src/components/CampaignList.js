import React, { Component } from 'react';

class CampaignList extends Component {
  constructor(props){
    super(props);

    this.onCampaignSelect = this.onCampaignSelect.bind(this);
    this.deleteCampaign = this.deleteCampaign.bind(this);
    this.toggleCampaign = this.toggleCampaign.bind(this);
    this.commentCampaign = this.commentCampaign.bind(this);
    this.renameCampaign = this.renameCampaign.bind(this);
  }

  onCampaignSelect(index){
    this.props.onCampaignSelect(index);
  }

  deleteCampaign(e,index){
    e.stopPropagation();
    this.props.deleteCampaign(index);
  }

  toggleCampaign(e,index){
    e.stopPropagation();
    this.props.toggleCampaign(index);
  }

  commentCampaign(e,index){
    e.stopPropagation();
    let comment = prompt("Please enter your comment", "");
    if (comment != null) {
      this.props.commentCampaign(index, comment);
    }
  }

  renameCampaign(e, index){
    e.stopPropagation();
    let oldName = this.props.campaignList[index].name;
    let newName = prompt("Please enter your comment", oldName);
    if (newName != null && newName!=oldName) {
      this.props.renameCampaign(index, oldName, newName);
    }
  }

  getList(campaignList){
    return campaignList.map((el, index) => {
      return (
        <div key={index} onClick={()=> this.onCampaignSelect(index)} className={"campaign-element-container " + (this.props.selectedCampaignIndex === index?'selected-campaign': '') }>
          <div className="campaign-element-name">
            <div className="campaign-serial-num">{index+1}</div>
            <div className="campaign-info">
              <div className="camapign-name">{el.name}</div>
              <div className="campaign-created"><span>Created at </span><span>{el.createdOn}</span></div>
            </div>
          </div>
          <div className="campaign-element-tools-panel">
            <div onClick={(e) => this.toggleCampaign(e,index)}>
              <span className="glyphicon glyphicon-pause">P</span>
              {el.status === 'paused'?<span className="campaign-tool-text">Pause</span>:<span className="campaign-tool-text">Play</span>}
            </div>
            <div onClick={(e) => this.commentCampaign(e,index)}>
              <span>C</span>
              <span className="campaign-tool-text">Comment</span>
            </div>
            <div onClick={(e) => this.renameCampaign(e,index)}>
              <span>R</span>
              <span className="campaign-tool-text">Rename</span>
            </div>
            <div onClick={(e) => this.deleteCampaign(e,index)}>
              <span>D</span>
              <span className="campaign-tool-text">Delete</span>
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
    let campaignList = this.props.campaignList;
    return (
      <div className="campaign-elements">
        {this.getList(campaignList)}
      </div>
    );
  }
}

export default CampaignList;