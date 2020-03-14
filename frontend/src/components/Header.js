import React, { Component } from 'react';
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
      isNavOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    if (window.innerWidth < 1200) {
      this.setState({
        isNavOpen: !this.state.isNavOpen
      });
    }
  }

  render() {
    const { changeKeyword, keyword } = this.props;
    return (
      <React.Fragment>
        <Navbar dark color='primary' expand='lg' fixed='top'>
          <div className='container'>
            <NavbarToggler onClick={this.toggleNav}></NavbarToggler>
            <NavbarBrand className='mr-auto white-text brand' href='/home'>
              <i className='fa fa-home' />
              &nbsp; BioInformatics Posts
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav className='ml-auto' navbar>
                <InputGroup>
                  <Input
                    placeholder='Enter some keywords here'
                    value={keyword}
                    onChange={changeKeyword}
                  />
                  <InputGroupAddon addonType='append'>
                    <Link to={`/search-results`}>
                      <Button color='secondary'>Search</Button>
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
