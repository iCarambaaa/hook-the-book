import { useState } from "react";
import SingleBook from "./SingleBook";
import { Col, Container, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";

const BookList = (props) => {
  // state = {
  //     searchQuery: '',
  //     selectedBook: null
  // }

  const [query, setQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search here"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            {props.books
              .filter((b) => b.title.toLowerCase().includes(query))
              .map((b) => (
                <Col xs={3} key={b.asin}>
                  <SingleBook
                    book={b}
                    selectedBook={selectedBook}
                    changeSelectedBook={(asin) => setSelectedBook(asin)}
                  />
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea asin={selectedBook} />
        </Col>
      </Row>
    </Container>
  );
};

export default BookList;
