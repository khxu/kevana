import React, { Component } from 'react';
import { ref, storage } from '../services/firebaseConstants';
import ReactMarkdown from 'react-markdown';
import UnauthenticatedSplash from '../components/UnauthenticatedSplash';
import '../css/AboutUs.css';
import Layout from '../components/layout';

class AboutUsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      aboutUsMarkdown: '',
      loading: true,
      heroImageUrl: ''
    };
  }

  componentDidMount() {
    ref.child('aboutUsDetails').once('value')
      .then( snapshot => {
        const aboutUsDetails = snapshot.val();
        this.setState({
          aboutUsMarkdown: aboutUsDetails.markdown,
          loading: false
        });
      })
      .catch( err => {
        console.log('Error getting markdown for About Us page: ', err);
        this.setState({
          loading: false
        });
      });
    
    storage.ref('IMG_2635_square.JPG').getDownloadURL().then(url => {
      this.setState({
        heroImageUrl: url
      });
    })
  }

  render() {
    const { aboutUsMarkdown, loading, heroImageUrl } = this.state;
    return (
      <Layout>
        { loading === true ?
            <div className="splash-container" style={{background: '#77878B'}}>
              <h1 style={{color: 'white', textAlign: 'center'}}>Loading...</h1>
            </div> :
              aboutUsMarkdown.length === 0 ?
              <UnauthenticatedSplash/> :
              <div style={{backgroundColor: '#F9DFD5'}}>
                <div className="secondary-page" style={{background: '#EAADAD'}}>
                  <h1 style={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>About Us</h1>
                </div>
                <div style={{textAlign: 'center', marginTop: '2rem'}}>
                  <img className='about-us-image' src={heroImageUrl} style={{margin: 'auto', borderRadius: '50%', paddingRight: '1rem', paddingLeft: '1rem'}}/>
                </div>
                <ReactMarkdown className="about-us-body" source={aboutUsMarkdown} />
              </div>
        }
      </Layout>
    )
  }
}

export default AboutUsPage;