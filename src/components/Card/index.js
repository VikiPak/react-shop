import styles from './Card.module.scss';
import ContentLoader from 'react-content-loader';
import React from 'react';

import AppContext from '../../context';

function Card({
  id, 
  title, 
  imageUrl, 
  price, 
  onFavorite, 
  onPlus, 
  favorited = false, 
  loading = false}) {

  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, parentId: id, title, imageUrl, price};

    const onClickPlus = () => {
      onPlus(obj);
    }
 
    const onClickFavorite = () => { 
      onFavorite(obj);
      setIsFavorite(!isFavorite);
    }

    return (
        <div className={styles.card}>
          {
            loading ?  (
              <ContentLoader 
                speed={2}
                width={210}
                height={225}
                viewBox="0 0 210 225"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb">
                <rect x="54" y="43" rx="0" ry="0" width="1" height="0" /> 
                <rect x="0" y="128" rx="5" ry="5" width="150" height="15" /> 
                <rect x="0" y="0" rx="10" ry="10" width="150" height="112" /> 
                <rect x="0" y="152" rx="5" ry="5" width="100" height="15" /> 
                <rect x="0" y="191" rx="5" ry="5" width="80" height="25" /> 
                <rect x="111" y="180" rx="5" ry="5" width="38" height="36" />
              </ContentLoader>
            ) : ( 
          <>
           {onFavorite && (
             <div className={styles.favorite} onClick={onClickFavorite}>
             <img src={isFavorite ? '/img/heart-liked.svg' :'/img/heart-unliked.svg'} alt ="Unliked"/>
             </div>
           )}
            <img width={133} height={112} src={imageUrl} alt="Sneakers" />
            <h5>{title}</h5>
            <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
            </div>
            { onPlus && <img 
            className={styles.plus} 
            onClick={onClickPlus} 
            src={isItemAdded(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'} 
            alt="Plus"
            /> }
            </div>
          </>
       )}
   </div>
  );
}
export default Card;