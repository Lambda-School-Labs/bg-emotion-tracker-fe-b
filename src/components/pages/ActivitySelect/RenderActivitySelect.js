import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Card, Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LayoutContainer } from '../../common';

const StyledActivitySelect = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  text-align: center;
  margin: 20px auto;
`;

let data = [
  {
    id: 1,
    activity: 'Check-In',
  },
  {
    id: 2,
    activity: 'Check-Out',
  },
  {
    id: 3,
    activity: 'Act 1',
  },
  {
    id: 4,
    activity: 'Act 2',
  },
  {
    id: 5,
    activity: 'Act 3',
  },
];

function RenderActivitySelect(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  const [activity, setActivity] = useState('');

  const menu = (
    <Menu>
      {data.map(item => (
        <Menu.Item key={item.id}>{item.activity}</Menu.Item>
      ))}
    </Menu>
  );

  const getActivity = e => {
    e.preventDefault();
    console.log(e);
  };

  return (
    <LayoutContainer>
      <NavBar titleName="Dashboard" backgroundColor="#293845" />
      <StyledActivitySelect>
        <h2>Select Activity</h2>

        <h2 style={{ textAlign: 'center' }}>
          <Dropdown overlay={menu} trigger={['click']}>
            <a className="ant-dropdown-link" onClick={getActivity}>
              Activity <DownOutlined />
            </a>
          </Dropdown>
        </h2>

        <StyledButton type="primary" onClick={() => history.push('/scanner')}>
          Submit
        </StyledButton>
      </StyledActivitySelect>
    </LayoutContainer>
  );
}
export default RenderActivitySelect;
