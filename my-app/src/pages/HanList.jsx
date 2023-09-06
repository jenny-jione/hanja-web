import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getList } from '../js/api';

const HanList = () => {
    const [list, setList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        page: 1,
        totalPage: 1,
        limit: 30,
        total: 0,
      });

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
        <Link to={`/${id}`} style={{ textDecoration: "none" }}>
            <td>{hanja}</td>
        </Link>
        <td>{kor}</td>
        </tr>
    ));
      };



    useEffect(() => {
        getHanList();
      }, [pageInfo.page, pageInfo.limit]);

    return (
        <>
        <div>
            <div className='header'>
                <h1>title</h1>
            </div>
            <div className='content'>
                <div>
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
            </div>
        </div>
        </>
    )
}

export default HanList;