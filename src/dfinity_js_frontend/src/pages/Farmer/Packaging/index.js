import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button as BButton, Modal, Form, FloatingLabel } from "react-bootstrap";
import { Button, Loader, NotificationError, NotificationSuccess } from "../../../components/utils";
import { addPackagedDetails } from "../../../utils/product";
import { toast } from "react-toastify";

function ProductPackaging({ product }) {

    const [packagingMaterial, setPackagingMaterial] = useState("");
    const [packagingType, setPackagingType] = useState("");
    const [packagingSize, setPackagingSize] = useState("");
    const [packagingColor, setPackagingColor] = useState("");
    const [packagingDate, setPackagingDate] = useState("");
  
    const [loading, setLoading] = useState(false);

    const packagingPayload = {
        packagingMaterial,
        packagingType,
        packagingSize,
        packagingColor,
        packagingDate
    };
    
    const { id} = product;
  
    const productId = id;
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  

    const handleSubmit = async () => {
        try{
            setLoading(true);
            await addPackagedDetails(productId, packagingPayload);
            toast( <NotificationSuccess text="Packaging details added successfully" />);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast( <NotificationError text="Failed to add packaging details" />);
            setLoading(false);
        }
    }
        
  
   
  
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <BButton
              color="blue_gray_900_02"
              size="12xl"
              className="min-w-[115px] rounded-[28px]"
              variant="primary"
              onClick={handleShow}
            >
              Package 
            </BButton>
  
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Package Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <FloatingLabel controlId="floatingInput" label="Packaging Material">
                        <Form.Control
                        type="text"
                        placeholder="Packaging Material"
                        onChange={(e) => setPackagingMaterial(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Packaging Type">
                        <Form.Control
                        type="text"
                        placeholder="Packaging Type"
                        onChange={(e) => setPackagingType(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Packaging Size">
                        <Form.Control
                        type="text"
                        placeholder="Packaging Size"
                        onChange={(e) => setPackagingSize(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Packaging Color">
                        <Form.Control
                        type="text"
                        placeholder="Packaging Color"
                        onChange={(e) => setPackagingColor(e.target.value)}
                        />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Packaging Date">
                        <Form.Control
                        type="date"
                        placeholder="Packaging Date"
                        onChange={(e) => setPackagingDate(e.target.value)}
                        />
                    </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                    variant="primary"
                    onClick={() => {
                        handleSubmit();
                        handleClose();
                    } }
                    >
                    Save
                    </Button>
                </Modal.Footer>
            </Modal>
           
          </>
        )}
      </>
    );
  }

  
  export default ProductPackaging;