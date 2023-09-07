import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../component/Background";
import TemplateBlock from "../component/Template";
import HomeHeadBlock from "../component/HomeTitle";
import HomeSelectButton from "../component/HomeButton";


const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "홈";
    })

    const randomNum = Math.floor(Math.random() * 1817 + 1);
    const toListPage = () => {navigate('/list');}
    const toCheckPage = () => {navigate(`/check/${randomNum}`);}
    const toTestPage = () => {navigate(`/test/${randomNum}`);}

    return (
        <>
        <GlobalStyle />
        <TemplateBlock>
            <HomeHeadBlock>
                <h1>漢字試驗準備</h1>
            </HomeHeadBlock>
            <HomeSelectButton onClick={toListPage}>목록</HomeSelectButton>
            <HomeSelectButton onClick={toCheckPage}>체크</HomeSelectButton>
            <HomeSelectButton onClick={toTestPage}>시험</HomeSelectButton>
        </TemplateBlock>
        </>

    )
}

export default Home;