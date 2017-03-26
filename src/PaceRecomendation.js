import React from 'react';

const PaceRecomendation = (props) => {
  return (
    <div className={"panel " + props.style}>
        <div className="panel-heading">
            <h3 className="panel-title">{props.title}</h3>
        </div>
        <div className="panel-body">
            <strong>{props.pace} мин/км</strong>
            <div dangerouslySetInnerHTML={{__html: props.msg}}></div>
        </div>
    </div>
  )
}
export default PaceRecomendation;
