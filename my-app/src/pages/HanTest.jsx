import { useEffect, useState } from "react";
import { getTest } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import ReactHotKey from 'react-shortcut';

// 시험
const HanTest = () => {
    const [data, setData] = useState({
        prev_id: null,
        h_info: {},
        next_id: null,
    });
    const [input, setInput] = useState('');
    const { hid } = useParams();
    const navigate = useNavigate();
    const isinput = 0

    useEffect(() => {
        document.title = '테스트';
    });

    const getHanTest = async () => {
        const result = await getTest(hid);
        if (typeof result === 'object') {
            setData(result?.data)
        }
    }

    const changePage = direction => {
        navigate(`/test/${data[direction]}`)
    }

    const toHomePage = () => {
        navigate('/list');
    }


    useEffect(() => {
        getHanTest();
    }, [hid]);


    return (
        <div>
            <button onClick={toHomePage}>Home</button>
            <ReactHotKey keys='right' onKeysPressed={() => changePage('next_id')}></ReactHotKey>
            <div>{data?.h_info?.id}</div>
            <div>{data?.h_info?.hanja}</div>
            {/* <div>{data?.h_info?.kor}</div> */}
            
            <div>
                <input 
                    type='text'
                    placeholder="입력"

                    ></input>
            </div>
            {/* <button onClick={() => changePage('next_id')}>Next</button> */}
        </div>
    )

}

export default HanTest;