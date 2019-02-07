import React, { Component } from 'react';

class HistoryPanel extends Component {
  constructor(props){
    super(props);
  }

	getComment(el, index){
		return(
			<div key={el.type + index} className="campaign-history-element">
				<div className="campaign-history-timeline-icon glyphicon glyphicon-edit"></div>
				<div>
					<strong>Comment </strong>
					<span>Added</span>
				</div>
				<div>
					<span>by </span>
					<strong className="campaign-history-username">{el.changedBy}</strong>
				</div>
				<div>
					<strong>"{el.comment}"</strong>
				</div>
			</div>
		)
	}

	getRename(el, index){
		return(
			<div ey={el.type + index} className="campaign-history-element">
				<div className="campaign-history-timeline-icon glyphicon glyphicon-pencil"></div>
				<div className="campaign-history-element-type">
					<span>Campaign </span>
					<strong>Renamed</strong>					
				</div>
				<div  className="campaign-history-element-change">
					<span>by </span>
					<strong className="campaign-history-username">{el.changedBy}</strong>
				</div>
				<div className="campaign-history-element-values">
					<strong className="line-through">{el.oldValue}</strong>
					<strong> {el.newValue}</strong>
				</div>
			</div>
		)
	}

	getCreated(el, index){
		return(
			<div key={el.type + index} className="campaign-history-element">
				<div className="campaign-history-timeline-icon glyphicon glyphicon-plus"></div>
				<div>
					<span>Campaign </span>
					<strong>Created</strong>
				</div>
				<div>
					<span>by </span>
					<strong className="campaign-history-username">{el.changedBy}</strong>
				</div>
			</div>
		)
	}

	getStatus(el, index){
		return(
			<div key={el.type + index} className="campaign-history-element">
				{el.type === 'paused'?<div className="campaign-history-timeline-icon glyphicon glyphicon-pause"></div>:<div className="campaign-history-timeline-icon glyphicon glyphicon-play"></div>}
				<div>
					<span>Campaign </span>
					<strong>{el.type}</strong>
				</div>
				<div>
					<span>by </span>
					<strong className="campaign-history-username">{el.changedBy}</strong>
				</div>
			</div>
		)
	}

  render(){
  	let history = this.props.selectedCampaign.history;
  	console.log(history);
  	return (
  		<div className="campaign-history-container">
  			<div className="campaign-history-heading">
  				<span className="campaign-history-heading-icon glyphicon glyphicon-repeat"></span>
  				<span>History</span>
  			</div>
  			<div className="campaign-history-name">{this.props.selectedCampaign.name}</div>
  			<div className="camapign-timeline-container">
  				{history.map((el, index) => {
  					let innerHtml;
  					if (el.type === 'comment') {
  						innerHtml = this.getComment(el, index);
  					} else if (el.type === 'rename') {
  						innerHtml = this.getRename(el, index);
  					} else if (el.type === 'created') {
  						innerHtml = this.getCreated(el, index);
  					} else if (el.type === 'paused' || el.type === 'played') {
  						innerHtml = this.getStatus(el, index);
  					}
  					return innerHtml;
  				})}
  			</div>
  		</div>
  	);
  }
}

export default HistoryPanel;