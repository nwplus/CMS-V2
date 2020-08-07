import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardButtonContainer
} from '../components/card';
import { COLOR, EDIT } from '../constants';
import Button from '../components/button';
import TextBox from '../components/textbox';
import { db } from '../utility/firebase';

const HeaderText = styled.p`
  border: none;
  overflow: hidden;
  background-color: ${COLOR.BACKGROUND};
  outline: none;
  font-size: 24px;
  padding-bottom: 13px;
  color: ${COLOR.TEXT};
  font-weight: 600;
`;

const ContentText = styled.p`
  border: none;
  overflow: hidden;
  background-color: ${COLOR.BACKGROUND};
  outline: none;
  color: ${COLOR.TEXT};
`;

const StyledCancel = styled.button`
  font-size: 16px;
  cursor: pointer;
  border-bottom: 2px solid ${COLOR.BLACK};
  margin-left: 675px;
  margin-right: 40px;
  border: none;
  outline: none;
  background-color: ${COLOR.BACKGROUND};
`;

const StyledHeader = styled.p`
  padding-bottom: 13px;
  padding-top: 17px;
  margin: 0px;
  background-color: ${COLOR.BACKGROUND};
`;

export default function IntroPage() {
  const [isEditingObj, setIsEditingObj] = useState({});
  const [websiteData, setWebsiteData] = useState({});
  // TODO need functionality to display data based on what event is currently being viewed

  // TODO need to substitute the value at .doc(ID) with current website
  const getHackathonData = async () => {
    await db
      .collection('Hackathons')
      .doc('IntroTestHackathon')
      .get()
      .then(doc => {
        setWebsiteData(doc.data().WebsiteData);
      });
  };

  const initializeIsEditingObj = () => {
    Object.keys(websiteData).forEach(type => {
      setIsEditingObj({
        ...isEditingObj,
        [type]: false
      });
    });
  };

  useEffect(() => {
    getHackathonData();
    initializeIsEditingObj();
  }, []);

  const handleEdit = type => {
    setIsEditingObj({
      ...isEditingObj,
      [type]: !isEditingObj[type]
    });
  };

  const handleCancel = type => {
    setIsEditingObj({
      ...isEditingObj,
      [type]: false
    });
  };

  /**
   * @param {string} type every section in the intro has a type, which is the key in the map of WebsiteData
   * reads the value of the header/content associated with the given type and updates the object in Firebase
   */
  const handleSave = async type => {
    const textareas = document.getElementsByClassName(type);
    const time = new Date(new Date().getTime());
    const updateObj = {
      WebsiteData: {
        ...websiteData,
        [type]: {
          editor: 'GRAB USER FROM REDUX?',
          time,
          title: websiteData[type].title
        }
      }
    };
    let header;
    let content;
    Array.prototype.forEach.call(textareas, textarea => {
      if (textarea.style.resize === 'none') {
        // if the textarea is the header (not resizable)
        header = textarea.value;
        updateObj.WebsiteData[type].header = header;
      } else {
        // if text area is content (resizable)
        content = textarea.value;
        updateObj.WebsiteData[type].content = content;
      }
    });
    // TODO need to substitute the value at .doc(ID) with current website
    await db
      .collection('Hackathons')
      .doc('IntroTestHackathon')
      .update(updateObj)
      .then(() => {
        setWebsiteData({
          ...websiteData,
          [type]: {
            ...websiteData[type],
            header,
            content,
            time
          }
        });
      })
      .catch(error => {
        console.error(error);
        alert('An error occured while trying to update the text section');
      });
    setIsEditingObj({
      ...isEditingObj,
      [type]: false
    });
  };

  function Content(props) {
    const { header, content, isEditing, type } = props;
    return (
      <>
        {isEditing ? (
          <div style={{ padding: '0px 40px 37px 40px' }}>
            <StyledHeader>Header</StyledHeader>
            <TextBox otherClassNames={type} defaultValue={header} />
            <StyledHeader>Body</StyledHeader>
            <TextBox otherClassNames={type} defaultValue={content} resize />
            <div style={{ marginTop: '27px', display: 'flex', float: 'right' }}>
              <StyledCancel onClick={() => handleCancel(type)}>
                <p
                  style={{
                    borderBottom: `2px solid ${COLOR.BLACK}`,
                    margin: '0px'
                  }}
                >
                  Cancel
                </p>
              </StyledCancel>
              <Button onClick={() => handleSave(type)}>Save</Button>
            </div>
          </div>
        ) : (
          <>
            <HeaderText>{header}</HeaderText>
            <ContentText>{content}</ContentText>
          </>
        )}
      </>
    );
  }

  // map over every text section in a hackathon's WebsiteData and adds the section name to isEditingObj state
  return (
    <>
      {Object.keys(websiteData).map(type => {
        return (
          <Card>
            <CardHeader>
              <CardTitle>{websiteData[type].title}</CardTitle>
              <p>{`Last edited by ${websiteData[type].editor} at ${new Date(
                websiteData[type].time.seconds * 1000
              ).toLocaleString()}`}</p>
              <CardButtonContainer>
                <Button type={EDIT} onClick={() => handleEdit(type)} />
              </CardButtonContainer>
            </CardHeader>
            <CardContent>
              <Content
                type={type}
                isEditing={isEditingObj[type]}
                header={websiteData[type].header}
                content={websiteData[type].content}
              />
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
