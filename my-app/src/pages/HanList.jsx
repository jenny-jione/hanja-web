import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getList } from '../js/api';
import { useNavigate } from "react-router-dom";
import GlobalStyle from "../component/Background";
import TemplateBlock from "../component/Template";
import BasicButton from './BasicButton';


const HanList = () => {
    const [list, setList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        page: 0,
        totalPage: 1,
        limit: 10,
        total: 0,
      });
    const navigate = useNavigate();

    useEffect(() => {
        document.title = '홈';
    });

    // 텍스트 리스트
    const getHanList = async () => {
        const result = await getList(pageInfo);
        if (typeof result === 'object') {
            setList(result?.data);
        }
    }

    // 테이블 렌더 함수
    const renderTableFn = () => {
      return list.map(({ id, hanja, kor, level }) => (
        <tr key={id}>
        <td>{id}</td>
        <Link to={`/detail/${id}`} style={{ textDecoration: "none" }}>
            <td>{hanja}</td>
        </Link>
            <td>{kor}</td>
        </tr>
        ));
    };

    const toHomePage = () => {navigate('/');}

    useEffect(() => {
        getHanList();
      }, [pageInfo.page, pageInfo.limit]);

    return (
        <>
        <GlobalStyle />
        <TemplateBlock>
            <BasicButton onClick={toHomePage}>Home</BasicButton>
            <div className='content'>
                <table>
                    <thead>
                    <tr>
                        <th>idx</th>
                        <th>han</th>
                        <th>kor</th>
                    </tr>
                    </thead>
                    <tbody>{renderTableFn()}</tbody>
                </table>
            </div>
        </TemplateBlock>
        </>
    )
}

export default HanList;