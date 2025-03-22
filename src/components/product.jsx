import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Product() {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/products`)
            .then(response => response.json())
            .then(result => {
                // Check if result.products is an array before setting state
                if (Array.isArray(result.products)) {
                    setProduct(result.products);
                } else {
                    console.error("Expected an array of products");
                }
            })
            .catch(error => console.error(error));
    }, []);
    useEffect(() => {
            fetch(``)
            .then()
            .then()
            .catch(error => console.log(error));
    }, []);

    return (
        <Container>
            <Row>
                <h1>List of Product</h1>
            </Row>
            <Row>
                {
                    Array.isArray(product) && product.length > 0 ? (
                        product.map((p) => (
                            <Col key={p?.id} md={3}>
                                <div className="card" style={{width: "10%" , height: "10%"}}>
                                    <Link to={"/product/" + p?.id}>
                                        <img
                                            src={p?.images}
                                            className="card-img-top"
                                            alt={p?.title}
                                            style={{ cursor: "pointer" }}
                                        />
                                    </Link>
                                    <div className="card-body">
                                        <div style={{ textAlign: "center" }}>
                                            <Link to={"/product/" + p?.id}>{p?.title}</Link>
                                            <p className="card-text">Brand: {p?.brand} </p>
                                            <p className="card-text">Price: {p?.price} $</p>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))
                    ) : (
                        <p>No products available.</p> // Fallback message
                    )
                }
            </Row>
        </Container>
    );
}

export default Product;
