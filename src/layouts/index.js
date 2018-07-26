import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import './index.css'
import Navbar from '../components/Navbar'
import '../css/Navbar.css'

import heartIcon from '../svg/ic_favorite_black_24px.svg';

const Layout = ({ children, data }) => (
  <div>
    <Helmet
      title={data.site.siteMetadata.title}
      meta={[
        { name: 'Ivana and Kevin\'s Wedding Site', content: 'Wedding description and location info' },
        { name: 'kevin ivana wedding', content: 'kevin and ivana\'s wedding site' },
      ]}
    />
    <Navbar/>
    <div
      style={{
        margin: '0'
      }}
    >
      {children()}
    </div>
    <div className="splash-container" style={{background: '#77878B', height: '20vh', width: '100vw'}}>
      <p style={{color: 'white'}}>Made with <img className="svg-icon" src={heartIcon} alt="heart icon"/> in San Francisco</p>
    </div>
  </div>
)

Layout.propTypes = {
  children: PropTypes.func,
}

export default Layout

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
