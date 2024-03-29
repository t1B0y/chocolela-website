import React, { useEffect, useRef } from 'react';
import {
  ListSliderCart,
  Overlay,
  SliderCart,
} from '../styledComponents/SliderCart';
import { useDispatch, useSelector } from 'react-redux';
import gsap from 'gsap';
import { closeCart, removeProduct, updateQuantity } from '../redux/cart';
import { QuantityButton } from '../styledComponents/QuantityProductButton';
import CartLogo from '../assets/cart.svg';

function CartSlider() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.cart.isOpen);
  const cart = useSelector((state) => state.cart);
  const slider = useRef();

  useEffect(() => {
    if (isOpen) {
      gsap.to(slider.current, { x: '-100%' });
    } else {
      gsap.to(slider.current, { x: '0' });
    }
  }, [isOpen]);

  const listItems = cart.items.map((item, idx) => {
    const variations =
      item.meta.product_type === 'variation' ? item.meta.variation : null;
    const variationsEls = [];

    if (variations) {
      for (let variation in variations) {
        variationsEls.push(
          <div className="variation">
            <span>{variation} : </span>
            <span>{variations[variation]}</span>
          </div>
        );
      }
    }

    return (
      <div key={item.title + idx} className="cart-item-container">
        <div className="image-item">
          <img src={item.featured_image} />
        </div>
        <div className="cart-item-right">
          <div className="text-item-cart">
            <span className="name">{item.title}</span>
            {variations && variationsEls}
          </div>
          <QuantityButton>
            <div
              onClick={() => {
                dispatch(
                  updateQuantity(item.item_key, item.quantity.value - 1)
                );
              }}
              className="quantity-side-button"
            >
              -
            </div>
            <div className="quantity-button-center">{item.quantity.value}</div>
            <div
              onClick={() => {
                dispatch(
                  updateQuantity(item.item_key, item.quantity.value + 1)
                );
              }}
              className="quantity-side-button"
            >
              +
            </div>
          </QuantityButton>
          <span className="price">{item.totals.total} €</span>
          <span
            onClick={() => dispatch(removeProduct(item.item_key))}
            className="remove"
          >
            Supprimer
          </span>
        </div>
      </div>
    );
  });

  return (
    <>
      <SliderCart ref={slider}>
        <div className="header-slider-cart">
          <div className="products-number">
            <img src={CartLogo} />
            {`${cart.item_count} Produit${cart.item_count > 0 ? 's' : ''}`}
          </div>
          <h3>Mon Panier</h3>
          <a className="close-slider-btn" onClick={() => dispatch(closeCart())}>
            {'\u2715'}
          </a>
        </div>
        <ListSliderCart>{listItems}</ListSliderCart>
        <span className="line-cart" />
        <div className="price-total">
          <span>Total</span>
          <span>{cart.totals.total} €</span>
        </div>
        <button className="cart-btn checkout-btn">Passer Ma commande</button>
        <button className="cart-btn shopping-btn">
          Continuer mon shopping
        </button>
      </SliderCart>
      {isOpen && <Overlay onClick={() => dispatch(closeCart())} />}
    </>
  );
}

export default CartSlider;
