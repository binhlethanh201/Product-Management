import { useEffect, useState } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState();
    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post(`https://dummyjson.com/auth/login`, {
                username,
                password
            });
            localStorage.setItem("token", response.data.token);
            const userResponse = await axios.get(`https://dummyjson.com/user`,{
                headers : {
                    Authorization: `Bearer ${response.data.token}`,
                },
            });
            localStorage.setItem("account", JSON.stringify(userResponse.data));
            navigate("/product");
        } catch(error){
            setMsg("Invalid username or password");
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            navigate("/product");
        }
    },[navigate]);
    
  return (
    <Container>
      <Row>
        <div>
          <h2 style={{ textAlign: "center" }}>Login to system</h2>
        </div>
        <div>
            {
                msg && <span style={{color: "red", textAlign: "center"}}>{msg}</span>
            }
        </div>
      </Row>
      <Row>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username </Form.Label>
            <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password </Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Row>
    </Container>
  );
}
export default Login;
