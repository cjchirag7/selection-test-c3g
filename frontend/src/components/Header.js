import React, { Component, createRef } from 'react';
import {
  Navbar,
  Input,
  InputGroupAddon,
  InputGroup,
  Nav,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      keyword: ''
    };
    this.changeKeyword = this.changeKeyword.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.searchButton = createRef();
  }

  changeKeyword(e) {
    this.setState({ keyword: e.target.value });
  }

  toggleNav() {
    if (window.innerWidth < 1200) {
      this.setState({
        isNavOpen: !this.state.isNavOpen
      });
    }
  }

  render() {
    const { keyword, isNavOpen } = this.state;
    return (
      <React.Fragment>
        <Navbar dark color='primary' expand='lg' fixed='top'>
          <div className='container'>
            <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
            <NavbarBrand className='mr-auto white-text brand' href='/home'>
              <i className='fa fa-home' />
              &nbsp; BioInformatics Posts
            </NavbarBrand>
            <Collapse isOpen={isNavOpen} navbar>
              <Nav className='ml-auto' navbar>
                <InputGroup>
                  <Input
                    placeholder='Enter some keywords here'
                    value={keyword}
                    onChange={this.changeKeyword}
                    onKeyUp={e => {
                      if (e.keyCode === 13) {
                        e.preventDefault();
                        this.searchButton.current.click();
                      }
                    }}
                  />
                  <InputGroupAddon addonType='append'>
                    <Link to={`/search-results?keyword=${keyword}`}>
                      <Button color='secondary' innerRef={this.searchButton}>
                        Search
                      </Button>
                    </Link>
                  </InputGroupAddon>
                </InputGroup>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
      </React.Fragment>
    );
  }
}

export default Header;
