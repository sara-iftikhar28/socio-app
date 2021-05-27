import React from "react";
import PropTypes from "prop-types";

const ListGroup = (props) => {
  const { items, textProperty, valueProperty, selectedItem, onItemSelect } =
    props;
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          onClick={() => onItemSelect(item)}
          className={
            selectedItem == item ? " active list-group-item" : "list group-item"
          }
          key={item[valueProperty]}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

// ListGroup.propTypes = {
//   items: PropTypes.array.isRequired,
//   onItemsSelect: PropTypes.func,
// };

export default ListGroup;
