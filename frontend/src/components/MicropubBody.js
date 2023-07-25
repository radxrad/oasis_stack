import React from "react";
import { ListGroup } from "react-bootstrap";
import Image from "react-bootstrap/Image";

export default function MicropubBody(props) {
  const { title, figure, body, abstract, refList } = props;
  return (
    <div className="micropub-body">
      <div className="heading">{title}</div>
      <div className="content">

          { figure && <Image src={figure} alt="figure" rounded></Image> }
          <b>ABSTRACT</b>
          <div className="text" dangerouslySetInnerHTML={{__html:abstract}} ></div>
          <hr/>
          <b>BODY</b>
        <div className="text" dangerouslySetInnerHTML={{__html:body}} ></div>

        <ListGroup className="ref-list">
          {refList && refList.length > 0 ? (
            <b >REFERENCES</b>
          ) : (
            ""
          )}
          {refList
            ? refList.map((item, i) => (
                <ListGroup.Item id={"ref-item-" + (i + 1)} key={i}>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </ListGroup.Item>
              ))
            : ""}
        </ListGroup>
      </div>
    </div>
  );
}
