import React, { Component } from 'react';
import { getPosts } from '../services/imageAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { MainDiv } from './Searchbar/Searchbar.styled';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    images: [],
    LargeImg: null,
    loading: false,
    page: 1,
    error: '',
    query: '',
    isloadMore: true,
  };
  handleSearch = data => {
    this.setState({ query: data, images:[], page: 1} );
  };
  openModal = data => {
    this.setState({ largeImg: data });
  };
  closeModal = () => {
    this.setState({ largeImg: null });
  };
  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ loading: true, error: '' });
      getPosts(this.state.query, this.state.page)
        .then(res => {
          if (!res.data.hits.length) {
            this.setState({ error: 'Empty array', items: [] });
            alert('Try another query!');
          } else {
            this.setState(prevState => ({
              images: [...prevState.images, ...res.data.hits],
            }))
        }
        if((res.data.totalHits - ((prevState.page) * 12)) < 12 ){
          this.setState({isloadMore: false})
        }
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => this.setState({ loading: false }));
    }
      }
  render() {
    const { images, largeImg } = this.state;
    return (
      <MainDiv>
        <Searchbar onSubmit={this.handleSearch}></Searchbar>
        {this.state.loading && <Loader />}
        {!this.state.loading && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ImageGallery images={images} openModal={this.openModal} />
            {images.length > 0 && this.state.isloadMore &&     
             (
              <Button clickHandler={this.loadMore}>Load more</Button>
            )}
            {largeImg && (
              <Modal largeImg={largeImg} onClose={this.closeModal} />
            )}
          </div>
        )}
      </MainDiv>
    );
  }
}
