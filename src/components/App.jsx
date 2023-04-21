import React, { useState, useEffect } from 'react';
import { getPosts } from '../services/imageAPI';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { MainDiv } from './Searchbar/Searchbar.styled';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState([]);
  const [largeImg, setLargeImg] = useState(null);
  const [isloadMore, setIsloadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [ setError] = useState('');

  // handleSearch = data => {
  //   this.setState({ query: data, images:[], page: 1} );
  // };
  const handleSearch = data => {
    setQuery(data);
    setImages([]);
    setPage(1);
  };
  // openModal = data => {
  //   this.setState({ largeImg: data });
  // };
  const openModal = data => {
    setLargeImg(data);
  };
  // closeModal = () => {
  //   this.setState({ largeImg: null });
  // };
  const closeModal = () => {
    setLargeImg(null);
  };
  // loadMore = () => {
  //   this.setState(prevState => ({ page: prevState.page + 1 }));
  // };
  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };
  useEffect(() => {
    if(!query) {return}
    setLoading(true);
    setError('');
    getPosts(query, page)
      .then(res => {
        if (!res.data.hits.length) {
          setError('Empty array');
          setImages([]);
          alert('Try another query!');
        } else {
          setImages(prevImages => [...prevImages, ...res.data.hits]);
        }
        if ((res.data.totalHits - (page - 1) * 12) < 12) {
                  setIsloadMore(false)}else {setIsloadMore(true)}
      })
      .catch(error => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [query, page, setError]);
 
  return (
    <MainDiv>
      <Searchbar onSubmit={handleSearch}></Searchbar>
      {loading && <Loader />}
      {!loading && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ImageGallery images={images} openModal={openModal} />
          {images.length > 0 && isloadMore && (
            <Button clickHandler={loadMore}>Load more</Button>
          )}
          {largeImg && <Modal largeImg={largeImg} onClose={closeModal} />}
        </div>
      )}
    </MainDiv>
  );
};

// 
// const isFirstRender = useRef()
// if (isFirstRender.current) {
//   console.log('Відбувся перший рендер')
//   isFirstRender.current = false
//   return
// }
