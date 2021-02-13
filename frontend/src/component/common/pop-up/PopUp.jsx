import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: fixed;
  height: 100%;
  top: 0;
  width: 100%;
  background: rgba(0,0,0,1);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 101;
  overflow-Y: scroll;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  min-height: 200px;
  background: white;
  margin: 20px auto;
  padding: 0px;
  box-sizing: border-box;
`;

class PopUp extends Component {
    static defaultProps = {
        height: "auto",
        width: "auto",
        closeOnEsc: false,
        className: "",
        customStyles: {},
        closeOnOutSideClick: true,
    };

    constructor(props) {
        super(props);
        this.winWrapper = React.createRef();
    }

    componentDidMount = () => {
        document.addEventListener("mousedown", this.handleClickOutside);
        document.addEventListener("keydown", this.handleKeyDown);
        document.body.style.overflowY = "hidden";
    };

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
        document.removeEventListener("keydown", this.handleKeyDown);
    };

    handleClickOutside = (event) => {
        const { closeOnOutSideClick } = this.props;
        const elemWrapper = this.winWrapper;
        if (
            !!elemWrapper &&
            elemWrapper.current !== null &&
            !elemWrapper.current.contains(event.target)
        ) {
            !!closeOnOutSideClick && this.handleClose();
        }
    };

    handleKeyDown = (e) => {
        const { closeOnEsc, onClose } = this.props;
        if ((e.keyCode === 27 || e.key === "Escape") && !!closeOnEsc) {
            onClose();
        }
    };

    handleClose = () => this.props.onClose();

    render() {
        return (
            <Container>
                <Wrapper>
                    {this.props.children}
                </Wrapper>
            </Container>
        );
    }
}

export default PopUp;
