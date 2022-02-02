import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { RequestType } from "../../typings/app";

interface CustomDropdownProps {
  onClick: (value: RequestType) => void;
  value: RequestType;
}

export const RequestTypeDropdown: React.FC<CustomDropdownProps> = ({
  onClick,
  value,
}) => {
  const options: RequestType[] = ["once", "daily", "weekly", "monthly"];

  return (
    <DropdownButton variant="second" size="sm" title={value}>
      {options.map((option) => (
        <Dropdown.Item
          as="button"
          onClick={(e) => {
            e.preventDefault();
            onClick(option);
          }}
          value={option}
        >
          {option}
        </Dropdown.Item>
      ))}
      <Dropdown.Item></Dropdown.Item>
    </DropdownButton>
  );
};
