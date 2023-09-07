import { useEffect, useState } from "react";
import { getDetail } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import ReactHotKey from 'react-shortcut';
import GlobalStyle from "../component/Background";
import TemplateBlock from "../component/Template";
import BasicButton from './BasicButton';


// 상세정보
const HanInfo = () => {
    const [data, setData] = useState({
        prev_id: null,
        h_info: {},
        next_id: null,
    });
    const { hid } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '상세';
    });

    const getHanDetail = async () => {
        const result = await getDetail(hid);
        if (typeof result === 'object') {
            setData(result?.data)
        }
    }

    const changePage = direction => {
        navigate(`/detail/${data[direction]}`)
    }

    const toHomePage = () => {
        navigate('/list');
    }





    useEffect(() => {
        getHanDetail();
    }, [hid]);


    return (
        <>
        <GlobalStyle />
        <TemplateBlock>
            <BasicButton onClick={toHomePage}>Home</BasicButton>
                <ReactHotKey keys='right' onKeysPressed={() => changePage('next_id')}></ReactHotKey>
                <div>{data?.h_info?.id}</div>
                <div>{data?.h_info?.hanja}</div>
                <div>{data?.h_info?.kor}</div>
                
                {/* <div>
                    <input 
                        type='text'
                        placeholder="입력"
                        ></input>
                </div> */}
                <button onClick={() => changePage('next_id')}>Next</button>
        </TemplateBlock>
        </>
        
    )

}

export default HanInfo;