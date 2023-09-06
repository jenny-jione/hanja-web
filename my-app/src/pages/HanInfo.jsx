import { useEffect, useState } from "react";
import { getDetail } from "../js/api";
import { useParams, useNavigate } from "react-router-dom";
import ReactHotKey from 'react-shortcut';

// 상세정보
const HanInfo = () => {
    const [info, setInfo] = useState([]);
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
        document.title = '상세';
    });

    const getHanDetail = async () => {
        const result = await getDetail(hid);
        if (typeof result === 'object') {
            setInfo(result?.data?.info);
            setData(result?.data)
        }
    }

    const changePage = direction => {
        navigate(`/${data[direction]}`)
    }





    useEffect(() => {
        getHanDetail();
    }, [hid]);


    return (
        <div>
            <ReactHotKey keys='right' onKeysPressed={() => changePage('next_id')}></ReactHotKey>
            <div>{info?.id}</div>
            <div>{info?.hanja}</div>
            <div>{info?.kor}</div>

            <div>{data?.h_info?.id}</div>
            <div>{data?.hanja}</div>
            <div>{data?.kor}</div>
            {/* <div>{data}</div> */}
            
            {/* <div>
                <input 
                    type='text'
                    placeholder="입력"
                    ></input>
            </div> */}
        </div>
    )

}

export default HanInfo;