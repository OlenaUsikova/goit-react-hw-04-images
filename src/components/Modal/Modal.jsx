import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const modalDiv = document.querySelector('#modal')

export const Modal =({onClose, largeImg})=> {
	const handleCloseModal = e => {
		console.log(e);
		if (e.key === 'Escape' || e.target === e.currentTarget) {
			onClose()}}
	useEffect(()=> {
	document.addEventListener('keydown', handleCloseModal)
	return () => {document.removeEventListener('keydown', handleCloseModal)}	
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	return ReactDOM.createPortal(
			<ModalWrapper onClick={handleCloseModal}>
				<ModalContent>
				<CloseButton onClick={onClose}>×</CloseButton>
					<img src={largeImg} alt="largeImg" />
				</ModalContent>
			</ModalWrapper>,
			modalDiv
		)	}

		const ModalWrapper = styled.div`
		position: fixed;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
	`
	
	const ModalContent = styled.div`
		position: relative;
		background-color: white;
		padding: 20px;
		overflow: hidden;
		max-width: 1000px;
		border-radius: 5px;
	`
	
	const CloseButton = styled.button`
		position: absolute;
		top: 5px;
		right: 5px;
		background-color: transparent;
		border: none;
		font-size: 20px;
		cursor: pointer;
	`
Modal.propTypes = {
    largeImg: PropTypes.string,
    onClose: PropTypes.func}  