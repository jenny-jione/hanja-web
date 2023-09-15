import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import CommonNavbar from '../component/RBSNav';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "홈";
    })

    const randomNum = Math.floor(Math.random() * 1817 + 1);
    const toCheckPage = () => {navigate(`/check/${randomNum}`);}
    const toTestPage = () => {navigate(`/test/${randomNum}`);}
    const toRecheckPage = () => {navigate(`/review/${randomNum}`);}

    return (
        <>
        <CommonNavbar/>
        <br></br>
        <br></br>
        <div>
            <Container className="panel">
                <div className="d-grid gap-2">
                    <Button href="/list" variant="light" size="lg">
                        list
                    </Button>
                    <Button onClick={() => toCheckPage()} variant="light" size="lg">
                        check
                    </Button>
                    <Button onClick={() => toTestPage()} variant="light" size="lg">
                        test
                    </Button>
                    <Button onClick={() => toRecheckPage()} variant="light" size="lg">
                        review
                    </Button>
                </div>
            </Container>
        </div>
        </>


    )
}

export default Home;