import React, { useContext, useState, useEffect } from 'react';
import { Table, Space } from 'antd';
import NavMenu from '../../common/NavMenu';
import { LayoutContainer } from '../../common/';
import NavBar from '../../common/NavBar';
import { AdminContext } from '../../../state/contexts';
import { getMembersReaction } from '../../../state/actions';
import { LoadingComponent } from '../../common';
import './ReactionsTable.css';
import styled from 'styled-components';
import { fetchMembersReaction } from '../../../api';
import { Menu, Dropdown, Layout } from 'antd';
import { DownOutlined, StockOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;

const StyledList = styled.div`
  max-width: 1200px;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;
const StyledView = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const sampleTableData = {
  rows: [
    {
      member: 'Member ID',
      clubname: 'Club Name',
      reactionvalue: 'Reaction Value',
      activities: 'Activity',
    },
  ],
  columns: [
    {
      title: 'Member ID',
      dataIndex: 'member',
      render: text => <p>{text}</p>,
      key: '1',
    },
    {
      title: 'Club Name',
      dataIndex: 'clubname',
      render: text => <p>{text}</p>,
      key: '2',
    },
    {
      title: 'Reaction Value',
      dataIndex: 'reactionvalue',
      render: text => <p>{String.fromCodePoint(parseInt(text, 16))}</p>,
      key: '3',
    },
    {
      title: 'Activity',
      dataIndex: 'activities',
      render: text => <p>{text}</p>,
      key: '4',
    },
  ],
};

export default function RenderReactionsTable() {
  const context = useContext(AdminContext);
  const [tableData, setTableData] = useState(sampleTableData);
  const [filterDeata, setFilterData] = useState(sampleTableData);
  const [whichClub, setWhichClub] = useState('');
  useEffect(() => {
    reactionDataToTableData();
  }, [context]);

  const fetchMembersReaction = () => {
    getMembersReaction("'authState'", context);
  };

  useEffect(() => {
    fetchMembersReaction();
  }, []);

  const reactionDataToTableData = () => {
    const newRows = [];
    context.memberReactions.forEach(reaction => {
      const newRow = {
        member: reaction.member,
        clubname: reaction.clubname,
        reactionvalue: reaction.reactionvalue,
        activities: reaction.activities,
      };
      newRows.push(newRow);
    });
    setTableData({
      ...tableData,
      rows: newRows,
    });
  };

  const menu = (
    <Menu>
      {context.clubs.filter(element => (
        <Menu.Item
          key={element.id}
          icon={<StockOutlined />}
          onClick={() => setWhichClub(element.clubname)}
          className="menu-club"
        ></Menu.Item>
      ))}
    </Menu>
  );
  return (
    <LayoutContainer>
      <NavBar titleName={'Manage Reactions'} backgroundColor="#293845" />
      <Layout>
        <Sider width={230} className="navSider">
          <NavMenu />
        </Sider>
        <Content>
          <Dropdown overlay={menu} trigger={['click']}>
            <a>
              {' '}
              className= "ant-dropdown-link" onClick={e => e.preventDefault()}
            </a>
            Club Name <DownOutlined />
          </Dropdown>
          {context.memberReactions.length === 0 ? (
            <div className="centered-content flex">
              <LoadingComponent message="loading" />
            </div>
          ) : (
            <StyledView>
              <StyledList>
                <Table
                  columns={tableData.columns}
                  dataSource={tableData.rows}
                  style={{ paddingLeft: 8 }}
                  pagination={{ position: ['none', 'bottomRight'] }}
                />
              </StyledList>
            </StyledView>
          )}
        </Content>
      </Layout>
    </LayoutContainer>
  );
}
