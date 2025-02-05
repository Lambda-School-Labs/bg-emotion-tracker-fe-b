import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import NavBar from '../../common/NavBar';
import { Button } from 'antd';
import axios from 'axios';
import { LayoutContainer } from '../../common';
import { baseUrl, getEmojis } from '../../../api/index';
import { YouthContext } from '../../../state/contexts/index';
import '../../../styles/styles.less';
import { getEmojisData } from '../../../state/actions';

const StyledEmojiSelectCheck = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  text-align: center;
  width: 1200px;
  max-width: 90%;
  margin: 3rem auto;
`;

const StyledEmojis = styled.div`
  width: 560px;
  height: 420px;
  position: absolute;
  left: 50%;
  margin-left: -280px;
  top: 50%;
  margin-top: -280px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: center;
`;

const StyledButton = styled(Button)`
  background-color: 293845;
  width: 200px;
  height: 80px;
  position: absolute;
  left: 50%;
  margin-left: -100px;
  top: 50%;
  margin-top: 220px;
`;

const emojiStyles = {
  borderRadius: '0px',
  border: '1px solid #ffffff',
  background: '#ffffff',
};

function RenderEmojiSelectCheck(props) {
  const { userInfo /*authService*/ } = props;
  const history = useHistory();
  const [memberReaction, setMemberReaction] = useState('1F601');
  const youthContext = useContext(YouthContext);

  useEffect(() => {
    youthContext.setEmoji(memberReaction);
    getEmojisData(youthContext);
  }, []);

  const onChange = e => {
    setMemberReaction(e.target.value);
    youthContext.setEmoji(e.target.value);
  };

  const onConfirm = () => {
    let tokenObj = JSON.parse(localStorage.getItem('okta-token-storage'));
    axios
      .post(
        `${baseUrl}/memberreactions/memberreaction/submit?mid=${youthContext.id}&aid=${youthContext.activity.activityid}&cid=${youthContext.club.clubid}&rx=${memberReaction}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${tokenObj.accessToken.accessToken}`,
          },
        }
      )
      .then(res => {
        history.push('/emoji-confirm-redirect');
      })
      .catch(e => console.log(e));
  };

  return (
    <LayoutContainer className="ydp">
      <NavBar hideMenu />
      <StyledEmojiSelectCheck>
        {/* <h2>Select Emoji</h2> */}

        <StyledEmojis>
          {/* <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F603'}
          >
            😃
          </button>

          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F60A'}
          >
            😊
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F60C'}
          >
            😌
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F61D'}
          >
            😝
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F60E'}
          >
            😎
          </button>

          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F601'}
          >
            😁
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F642'}
          >
            🙂
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F610'}
          >
            😐
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F641'}
          >
            🙁
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F61E'}
          >
            😞
          </button>

          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F62E'}
          >
            😮
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F915'}
          >
            🤕
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F974'}
          >
            🥴
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F971'}
          >
            🥱
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F634'}
          >
            😴
          </button>

          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F622'}
          >
            😢
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F62D'}
          >
            😭
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F628'}
          >
            😨
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F620'}
          >
            😠
          </button>
          <button
            className="emojiBtn"
            style={emojiStyles}
            onClick={onChange}
            value={'1F624'}
          >
            😤
          </button> */}
          {youthContext.emojis != [] ? (
            youthContext.emojis.map(emoji => {
              return (
                <button
                  className="emojiBtn"
                  style={emojiStyles}
                  onClick={onChange}
                  value={emoji.reactionvalue}
                >
                  {String.fromCodePoint(parseInt(emoji.reactionvalue, 16))}
                </button>
              );
            })
          ) : (
            <></>
          )}
        </StyledEmojis>

        <StyledButton
          type="primary"
          className="emojiConfirmBtn"
          onClick={onConfirm}
        >
          Confirm
        </StyledButton>
      </StyledEmojiSelectCheck>
    </LayoutContainer>
  );
}
export default RenderEmojiSelectCheck;
