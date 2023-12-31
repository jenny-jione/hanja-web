import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import { signIn } from '../js/api';
import { getCookie, setCookie } from "../js/cookie";
import { catchErrorHandler } from '../js/common';

const Login = () => {
    const [ userId, setUserId ] = useState('');
    const [ userPw, setUserPw ] = useState('');
    const [ idInput, setIdInput ] = useState('');
    const [ pwInput, setPwInput ] = useState('');
    const navigate = useNavigate();

    const logIn = async () => {
        if (userId !== '' && userPw !== '') {
            const result = await signIn(userId, userPw);
            if (typeof result === 'object') {
                const { access_token, user_id } = result?.data;
                setCookie('myToken', access_token, {
                    path: '/',
                });
                setCookie('userInfo', user_id, {
                    path: '/',
                });
                navigate('/home');
            } else {
                catchErrorHandler(result);
            }
        };
    }

    useEffect(() => {
        document.title = "로그인";
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        setUserId(idInput);
        setUserPw(pwInput);
        logIn();
    }

    // useEffect(() => {
    //     if (getCookie('myToken')) navigate('/home');
    // }, []);

    return (
        <>
        <br></br>
        <br></br>
        <div>
            <Container className="panel">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>id</Form.Label>
                        <Form.Control 
                            type="id" 
                            placeholder="Enter ID" 
                            value={idInput}
                            onChange={(e) => setIdInput(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter Password"
                            value={pwInput}
                            onChange={(e) => setPwInput(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </div>
        </>


    )
}

export default Login;