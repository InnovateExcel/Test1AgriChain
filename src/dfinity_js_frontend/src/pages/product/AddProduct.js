import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button as BButton, Modal, Form, FloatingLabel } from "react-bootstrap";
import { Button } from "../../components/utils";

const AddProduct = ({ save }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <BButton
      color="blue_gray_900_02"
      size="12xl"
      className="min-w-[115px] rounded-[28px]"
      variant="primary" onClick={handleShow}>
        Add Product
      </BButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel controlId="floatingInput" label="Product Name">
              <Form.Control
                type="text"
                placeholder="Product Name"
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Description">
              <Form.Control
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Category">
              <Form.Control
                type="text"
                placeholder="Category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Image">
              <Form.Control
                type="text"
                placeholder="Image URL"
                onChange={(e) => setImage(e.target.value)}
              />
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            
            onClick={() => {
              save({ name, description, category, image });
              handleClose();
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProduct;
