import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
const modalDiv = document.querySelector('#modal')

export class Modal extends Component {
	handlcloseModal = e => {
		console.log(e);
		if (e.key === 'Escape' || e.target === e.currentTarget) {
			this.props.onClose()}		}

	// onBackdropClick = e => {
	// 	if (e.target === e.currentTarget) {
	// 		this.props.onClose()		}
	// 		}
	componentDidMount() {
		document.addEventListener('keydown', this.handlcloseModal)
	}
	componentWillUnmount() {
		document.removeEventListener('keydown', this.handlcloseModal)
	}
	render() {
		const { onClose, largeImg } = this.props
		return ReactDOM.createPortal(
			<ModalWrapper onClick={this.handlcloseModal}>
				<ModalContent>
				<CloseButton onClick={onClose}>×</CloseButton>
					<img src={largeImg} alt="largeImg" />
				</ModalContent>
			</ModalWrapper>,
			modalDiv
		)	}}

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