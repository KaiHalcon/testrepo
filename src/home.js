import React, { useState, useEffect } from "react";
import { List, Button, Input, Form, Modal, message } from "antd";
import { LogoutButton } from "./containers/Logout";
import "./styles.scss";
import axios from "axios";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [key, setKey] = useState(1);
  const [item, setItem] = useState("");
  const [color, setColor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [editKey, setEditKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addItem = (newItem, newColor, newCapacity) => {
    setKey(key + 1);
    const newObject = {
      id: key,
      name: newItem,
      data: {
        color: newColor,
        capacity: newCapacity,
      },
    };
    const newItems = items.concat(newObject);
    setItems(newItems);
    message.success("Item added successfully!");
  };

  const editItem = (editedItem, editedColor, editedCapacity) => {
    const editedObject = {
      id: editKey,
      name: editedItem,
      data: {
        color: editedColor,
        capacity: editedCapacity,
      },
    };
    let editedList = [];
    for (let x of items) {
      if (x.id === editKey) {
        editedList.push(editedObject);
      } else {
        editedList.push(x);
      }
    }
    setItems(editedList);
    message.success("Item edited successfully!");
    showModal();
  };

  const deleteItem = (itemToDelete) => {
    const newList = items.filter((listItem) => {
      return listItem.id !== itemToDelete;
    });
    setItems(newList);
    message.success("Item removed successfully!");
  };

  const showModal = () => {};

  const showEdit = (eKey, eItem, eColor, eCapacity) => {
    setIsEditOpen(true);
    setIsModalOpen(!isModalOpen);
    setItem(eItem);
    setColor(eColor);
    setCapacity(eCapacity);
    setEditKey(eKey);
  };

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleCapacityChange = (e) => {
    setCapacity(e.target.value);
  };

  const handleAdd = () => {
    addItem(item, color, capacity);
    setItem("");
    setColor("");
    setCapacity("");
  };

  const handleEdit = () => {
    editItem(item, color, capacity);
  };

  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      setIsAuthenticated(true);
      //handleGetProducts();
    }
  }, [sessionStorage]);

  return (
    <div>
      <Form>
        <Form.Item className="formBtns">
          <Button
            className="button"
            onClick={showModal}
            style={{
              marginRight: 10,
            }}
          >
            Add Items
          </Button>

          {<LogoutButton setIsAuthenticated={setIsAuthenticated} />}
        </Form.Item>
      </Form>
      <div className="listDiv">
        <List
          className="listItems"
          header={
            <div className="listHeader">
              <h2>ITEMS IN STORAGE</h2>
            </div>
          }
          bordered
          dataSource={items}
          renderItem={(i) => (
            <List.Item>
              <Button
                className="button"
                onClick={() =>
                  showEdit(i?.id, i?.name, i?.data?.color, i?.data?.capacity)
                }
                style={{ width: 100 }}
              >
                Edit
              </Button>
              {`\t`}
              <Button
                className="button"
                onClick={() => deleteItem(i?.id)}
                style={{ width: 100 }}
              >
                Delete
              </Button>
              {`\tName: `}
              <b>{`${i?.name} `}</b>
              <br />
              {`\tColor: `}
              <b>{`${i?.data?.color}`}</b>
              <br />
              {`\tCapacity: `}
              <b>{`${i?.data?.capacity}`}</b>
            </List.Item>
          )}
        />
      </div>

      <Modal
        title={isEditOpen ? "Edit Item" : "Add Item"}
        open={isModalOpen}
        onOk={isEditOpen ? handleEdit : handleAdd}
        onCancel={showModal}
        okText={isEditOpen ? "Edit" : "Add"}
      >
        <Input
          onChange={handleItemChange}
          placeholder="Phone Brand"
          value={item}
          style={{ textAlign: "center", width: 475 }}
          onPressEnter={
            isEditOpen
              ? () => {
                  showModal();
                  handleEdit();
                }
              : () => handleAdd()
          }
        />
        <Input
          onChange={handleColorChange}
          placeholder="Color"
          value={color}
          style={{ textAlign: "center", width: 475 }}
          onPressEnter={
            isEditOpen
              ? () => {
                  showModal();
                  handleEdit();
                }
              : () => handleAdd()
          }
        />
        <Input
          onChange={handleCapacityChange}
          placeholder="Capacity"
          value={capacity}
          style={{ textAlign: "center", width: 475 }}
          onPressEnter={
            isEditOpen
              ? () => {
                  showModal();
                  handleEdit();
                }
              : () => handleAdd()
          }
        />
      </Modal>
    </div>
  );
};
