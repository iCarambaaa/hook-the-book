import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const AddComment = (props) => {
  const [stateObject, setStateObject] = useState({
    comment: "",
    rate: 1,
    elementId: null,
  });

  //   componentDidUpdate(prevProps) {
  //     if (prevProps.asin !== this.props.asin) {
  //       this.setState({
  //         comment: {
  //           ...this.state.comment,
  //           elementId: this.props.asin,
  //         },
  //       });
  //     }
  //   }

  useEffect(() => {
    setStateObject();
  }, [stateObject]);

  const sendComment = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments",
        {
          method: "POST",
          body: JSON.stringify(stateObject.comment),
          headers: {
            "Content-type": "application/json",

            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTRiMzUyNjRiYjUzZDAwMTViMWEwMzQiLCJpYXQiOjE2MzM0Mzk0OTQsImV4cCI6MTYzNDY0OTA5NH0.aCFWesXwOAXs8l44Zsafj7Ni7xfAV1EyOJ48SdSotoA",
          },
        }
      );
      if (response.ok) {
        // the comment has been sent succesfully!!
        alert("Comment was sent!");
      } else {
        console.log("error");
        alert("something went wrong");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div>
      <Form onSubmit={sendComment}>
        <Form.Group>
          <Form.Label>Comment text</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add comment here"
            value={stateObject.comment}
            onChange={(e) =>
              setStateObject({ ...stateObject, comment: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            as="select"
            value={stateObject.rate}
            onChange={(e) =>
              setStateObject({
                ...stateObject,
                rate: e.target.value,
              })
            }
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddComment;
