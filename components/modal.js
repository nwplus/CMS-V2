import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  COLOR,
  EDIT,
  VIEW,
  NEW,
  CLOSE,
  DELETE,
  SAVE,
  FAQ,
  SPONSORSHIP
} from '../constants';
import TextBox from './textbox';
import Button from './button';

const BackDropScreen = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: ${COLOR.BLACK};
  opacity: 10%;
`;

export const ModalTitle = styled.h1`
  margin: 0;
  text-align: left;
  font-family: Apercu Pro;
  font-size: 24px;
  line-height: 30px;
  color: ${COLOR.BLACK};
`;

const Label = styled.label`
  display: block;
  margin-top: 16px;
  font-size: 16px;
  line-height: 20px;
`;

const InputField = styled.input`
  height: 40px;
  border: 1px solid ${COLOR.DARK_GRAY};
  margin: 0.5rem 0;
  padding: 0 0.5rem;
  width: 95%;
  background: ${COLOR.WHITE};
`;

const TextBoxContainer = styled(TextBox)`
  display: block;
  margin-right: 40px !important;
  width: 100%;
`;

export const ModalField = ({ label, value, type = 'text' }) => {
  // TODO: add detect dropdown based on label === category?
  return (
    <>
      <div>
        <Label>{label}</Label>
        {/* {label === "Category && dropdown here"} */}
        {label === 'Answer' ? (
          <TextBoxContainer defaultValue={value} />
        ) : (
          <InputField type={type} defaultValue={value} />
        )}
      </div>
    </>
  );
};

const Dropdown = styled.select``;

const LogoImage = styled.div``;

const UploadButton = styled.button``;

const UploadContainer = ({ onClick }) => (
  <>
    <InputField />
    <UploadButton onClick={onClick} />
  </>
);

const GenericText = styled.p``;

const ModalBackground = styled.div`
  transform: translateY(0);
  position: absolute;
  display: block;
  padding: 40px;
  z-index: 500;
  background-color: ${COLOR.BACKGROUND};
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-out;
  /* TODO: add media queries to make width responsive */
  width: 740px;
  max-width: 100%;
  height: 480px;
  max-height: 100%;
`;

const ButtonContainer = styled.span`
  margin: 0;
  float: right;
  display: inline-block;
`;

export const ModalButton = ({ type, handleClose, handleSave }) => (
  <ButtonContainer>
    {type === CLOSE && (
      <Button type={CLOSE} color={COLOR.TRANSPARENT} onClick={handleClose} />
    )}
    {type !== CLOSE && (
      <>
        <Button
          onClick={handleClose}
          color={'linear-gradient(180deg, #FF4E4E 0%, #FFEBEB 289.71%)'}
        >
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </>
    )}
  </ButtonContainer>
);

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  grid-gap: 32px;
  background-color: ${COLOR.BACKGROUND};
  text-align: left;
`;

export const ModalContent = ({ type, columns = 2, children }) => {
  if (type === SPONSORSHIP) {
    return (
      <>
        <ContentContainer columns={'40% 60%'}>{children}</ContentContainer>
      </>
    );
  }
  return (
    <>
      <ContentContainer columns={columns === 2 ? '60% 40%' : 'auto'}>
        {children}
      </ContentContainer>
    </>
  );
};

export default function Modal({
  isOpen,
  handleClose,
  handleSave,
  modalAction,
  children
}) {
  if (!isOpen) {
    return null;
  }

  // let type;
  // useEffect(() => {
  //   type = Object.values(data).some(isValidUrl) ? SPONSORSHIP : FAQ;
  // }, [data]);

  return (
    <>
      <BackDropScreen />
      <ModalBackground isOpen={isOpen}>
        <ModalButton type={CLOSE} handleClose={handleClose} />
        <ModalTitle>
          {modalAction === VIEW ? 'Edit Item' : 'View Details'}
        </ModalTitle>
        {children}
        <ModalButton
          type={['Cancel', 'Save']}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      </ModalBackground>
    </>
  );
}
